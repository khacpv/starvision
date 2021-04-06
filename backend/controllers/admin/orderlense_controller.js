const express = require("express");
const router = express.Router();
const models = require("../../models/index");
const OrderLense = models.OrderLense;
const Lense = models.Lense;
const Customer = models.Customer;
const Doctors = models.Doctors;
const { check, validationResult } = require("express-validator");
const sequelize = require("../../config/db").sequelize;
const Op = require("../../config/db").Sequelize.Op;
const CONSTANT = require("../../config/constants.json");
const LensePrice = models.LensePrice;

router.get("/", async (req, res) => {
  if (req.user.role == "admin") {
    let total = await OrderLense.count({});
    const startDate = req.body.RangDate ? new Date(req.body.RangDate[0]) : null;
    const endDate = req.body.RangDate ? new Date(req.body.RangDate[1]) : null;
    const name = req.body.doctorName ? req.body.doctorName : "";
    let result = await OrderLense.findAll({
      where: {
        ...(startDate &&
          endDate && { createdAt: { [Op.between]: [startDate, endDate] } }),
      },
      limit: Number(req.query.limit),
      offset: Number(req.query.offset),
      include: [
        {
          model: Doctors,
          as: "customer",
          where: {
            [Op.and]: [
              {
                name: {
                  [Op.like]: `%${name}%`,
                },
              },
            ],
          },
          attributes: ["name"],
          required: false,
        },
        {
          model: Lense,
          as: "left",
        },
        {
          model: Lense,
          as: "right",
        },
      ],
      order: [["date_examination", "DESC"]],
    });
    console.log(result);
    if (result) {
      let returnData = [];
      result.forEach((element) => {
        if (element.right && element.left) {
          returnData.push({
            id: element.id,
            is_active: element.is_active,
            Ngay: element.date_examination,
            So_Don_Hang: element.order_number,
            type: element.type,
            customer: element.customer,
            R: {
              id_order: element.right.id,
              od_lense: element.right.lense,
              od_kcode: element.right.kcode,
              od_power: element.right.power,
              od_size: element.right.size,
              note_order_lens: element.right.note,
              price: element.right.price,
              paid: element.right.paid,
              is_paid: element.right.is_paid,
              glass_money: element.right.glass_money,
              amount: element.right.amount,
              status: element.right.status == 1 ? "Đã yêu cầu" : "Đã hủy",
              prefix: element.prefix,
            },
            L: {
              id_order: element.left.id,
              os_lense: element.left.lense,
              os_kcode: element.left.kcode,
              os_power: element.left.power,
              os_size: element.left.size,
              note_order_lens: element.left.note,
              price: element.left.price,
              paid: element.right.paid,
              paid: element.right.is_paid,
              glass_money: element.right.glass_money,
              amount: element.right.amount,
              status: element.left.status == 1 ? "Đã yêu cầu" : "Đã hủy",
              prefix: element.prefix,
            },
          });
        }
      });
      return res.send({
        status: "success",
        message: "",
        total: total,
        data: returnData,
      });
    }
    return res.send({
      status: "error",
      message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
      data: "",
    });
  }
});

router.get("/:id", async (req, res) => {
  let result = await OrderLense.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Lense,
        as: "left",
      },
      {
        model: Lense,
        as: "right",
      },
    ],
  });
  if (result) {
    result.left.status = result.left.status == 1 ? "Đã yêu cầu" : "Đã hủy";
    result.right.status = result.right.status == 1 ? "Đã yêu cầu" : "Đã hủy";
    return res.send({ code: 200, msg: "success", items: result });
  }
  return res.send({
    status: "error",
    message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
    data: "",
  });
});

router.post(
  "/",
  [
    check("iddttc", "Không tìm thấy thông tin người lập!").not().isEmpty(),
    check("khid", "Không tìm thấy thông tin khách hàng!").not().isEmpty(),
    check("idbacsi", "Không tìm thấy thông tin bác sĩ!").not().isEmpty(),
  ],
  async (req, res) => {
    if (req.user.role == "admin") {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send({
          status: "error",
          message: errors.array()[0].msg,
          data: "",
        });
      }
      let orderLenseType = req.body.type;
      if (
        orderLenseType != CONSTANT.OrderLense.SOFT &&
        orderLenseType != CONSTANT.OrderLense.GOV
      ) {
        return res.send({
          status: "error",
          message: "Sai thông tin loại order lense",
          data: "",
        });
      }
      let lense_L = req.body.lense_L;
      let kcode_L = req.body.kcode_L;
      let power_L = req.body.power_L;
      let side_L = req.body.side_L;

      let lense_R = req.body.lense_R;
      let kcode_R = req.body.kcode_R;
      let power_R = req.body.power_R;
      let side_R = req.body.side_R;
      let ngay_tao = req.body.ngay_tao;
      let lense_price = await LensePrice.findOne({
        limit: 1,
        where: {
          type: req.body.type,
        },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "status"],
        },
      });

      let price = lense_price ? lense_price.price : 0;

      let result = null;
      try {
        // get transaction
        transaction = await sequelize.transaction();
        let left = await Lense.create({
          lense: lense_L,
          kcode: kcode_L,
          power: power_L,
          size: side_L,
          note: req.body.note_order_lens,
          side: "L",
          prefix: req.body.prefixLeft,
          is_paid: req.body.is_paid,
          glass_money: req.body.glass_money,
          paid: req.body.paid_L,
          glass_money: req.body.glass_money_L,
          amount: req.body.amount_L ? req.body.amount_L : 1,
          price: price,
        });

        let right = await Lense.create({
          lense: lense_R,
          kcode: kcode_R,
          power: power_R,
          size: side_R,
          note: req.body.note_order_lens,
          side: "R",
          is_paid: req.body.is_paid,
          prefix: req.body.prefixRight,
          paid: req.body.paid_R,
          glass_money: req.body.glass_money_R,
          amount: req.body.amount_R ? req.body.amount_R : 1,
          price: price,
        });
        let todayStart = new Date().setHours(0, 0, 0, 0);
        let now = new Date();

        let date = new Date();
        let orderNumberCount = await OrderLense.count({
          where: {
            customer_id: req.body.khid,
            createdAt: {
              [Op.gt]: todayStart,
              [Op.lt]: now,
            },
          },
        });
        orderNumberCount += 1;
        let order_number =
          req.body.khid +
          "." +
          date.getFullYear() +
          date.getMonth() +
          date.getDate() +
          "." +
          orderNumberCount;

        if (left && right) {
          result = await OrderLense.create({
            doctor_code: req.body.mabacsi,
            doctor_id: req.body.idbacsi,
            customer_id: req.body.khid,
            dttc_id: req.body.iddttc,
            date_examination: ngay_tao,
            type: req.body.type,
            id_lense_left: left.id,
            id_lense_right: right.id,
            is_active: 1,
            order_number: order_number,
          });
        }
        // commit
        await transaction.commit();
      } catch (err) {
        // Rollback transaction only if the transaction object is defined
        if (transaction) await transaction.rollback();

        return res.send({
          status: "error",
          message:
            "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
          data: "",
        });
      }

      if (result) {
        return res.send({ status: "success", message: "", data: "" });
      }
      return res.send({
        status: "error",
        message:
          "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
        data: "",
      });
    }
  }
);

router.put(
  "/:id",
  [
    check("iddttc", "Không tìm thấy thông tin người lập!").not().isEmpty(),
    check("khid", "Không tìm thấy thông tin khách hàng!").not().isEmpty(),
    check("idbacsi", "Không tìm thấy thông tin bác sĩ!").not().isEmpty(),
  ],
  async (req, res) => {
    if (req.user.role == "admin") {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send({
          status: "error",
          message: errors.array()[0].msg,
          data: "",
        });
      }
      let customerCount = await Customer.count({
        where: {
          id: req.body.khid,
          dttc_id: req.body.iddttc,
        },
      });

      if (customerCount == 0) {
        return res.send({
          status: "error",
          message: "Thông tin khách hàng của bác sĩ chưa chính xác.",
          data: "",
        });
      }
      let orderLenseType = req.body.type;
      if (
        orderLenseType &&
        orderLenseType != CONSTANT.OrderLense.SOFT &&
        orderLenseType != CONSTANT.OrderLense.GOV
      ) {
        return res.send({
          status: "error",
          message: "Sai thông tin loại order lense",
          data: "",
        });
      }
      let lense_L = req.body.lense_L;
      let kcode_L = req.body.kcode_L;
      let power_L = req.body.power_L;
      let side_L = req.body.side_L;

      let lense_R = req.body.lense_R;
      let kcode_R = req.body.kcode_R;
      let power_R = req.body.power_R;
      let side_R = req.body.side_R;
      let ngay_tao = req.body.ngay_tao;

      let result = null;

      let orderLense = await OrderLense.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!orderLense) {
        return res.send({
          status: "error",
          message:
            "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
          data: "",
        });
      }

      try {
        // get transaction
        transaction = await sequelize.transaction();

        let left = await Lense.update(
          {
            lense: lense_L,
            kcode: kcode_L,
            power: power_L,
            size: side_L,
            note: req.body.note_order_lens,
            prefix: req.body.prefixLeft,
            date_examination: ngay_tao,
            paid: req.body.paid_L,
            is_paid: req.body.is_paid,
            glass_money: req.body.glass_money_L,
            amount: req.body.amount_L ? req.body.amount_L : 1,
            price: req.body.price_L,
          },
          {
            where: {
              id: orderLense.id_lense_left,
            },
          }
        );

        let right = await Lense.update(
          {
            lense: lense_R,
            kcode: kcode_R,
            power: power_R,
            size: side_R,
            note: req.body.note_order_lens,
            prefix: req.body.prefixRight,
            paid: req.body.paid_R,
            is_paid: req.body.is_paid,
            glass_money: req.body.glass_money_R,
            amount: req.body.amount_R ? req.body.amount_R : 1,
            price: req.body.price_R,
          },
          {
            where: {
              id: orderLense.id_lense_right,
            },
          }
        );
        if (left && right) {
          await OrderLense.update(
            {
              type: orderLenseType,
              paid: req.body.paid,
              is_paid: req.body.is_paid,
              glass_money: req.body.glass_money,
              amount: req.body.amount,
            },
            {
              where: {
                id: orderLense.id,
              },
            }
          );
        }
        // commit
        await transaction.commit();
        return res.send({ status: "success", message: "", data: "" });
      } catch (err) {
        // Rollback transaction only if the transaction object is defined
        if (transaction) await transaction.rollback();

        return res.send({
          status: "error",
          message:
            "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
          data: "",
        });
      }
    }
    return res.send({
      status: "error",
      message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
      data,
    });
  }
);

router.delete("/:id", async (req, res) => {
  if (req.user.role == "admin") {
    let result = await OrderLense.destroy({
      where: { id: req.params.id },
    });
    if (result) {
      return res.send({ code: 200, msg: "success" });
    }
    return res.send({ code: 400, msg: "error" });
  }
});

router.post("/cancel", async (req, res) => {
  if (req.user.role == "admin") {
    let orderNumber = req.body.so_don_hang;
    let result = await OrderLense.update(
      {
        is_active: 0,
      },
      {
        where: {
          order_number: orderNumber,
        },
      }
    );
    if (result) {
      return res.send({
        status: "success",
        message: "Cập nhật thành công",
        data: "",
      });
    } else {
      return res.send({
        status: "error",
        message: "Đơn hàng không tồn tại.",
        data: "",
      });
    }
  }
});

module.exports = router;
