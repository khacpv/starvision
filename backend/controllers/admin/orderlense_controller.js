const express = require("express");
const router = express.Router();
const models = require("../../models/index");
const OrderLense = models.OrderLense;
const Lense = models.Lense;
const Customer = models.Customer;
const { check, validationResult } = require("express-validator");
const sequelize = require("../../config/db").sequelize;
const Op = require("../../config/db").Sequelize.Op;
const CONSTANT = require("../../config/constants.json");

router.get("/", async (req, res) => {
  if (req.user.role == "admin") {
    let result = await OrderLense.findAll({
      // where: {
      //   is_active: 1,
      // },
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
      order: [["date_examination", "DESC"]],
    });

    if (result) {
      let returnData = [];
      result.forEach((element) => {
        let date = new Date(element.date_examination)
        if (element.right && element.left){
          returnData.push({
            id : element.id,
            is_active: element.is_active,
            Ngay:
              date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
            So_Don_Hang: element.order_number,
            type: element.type,
            R: {
              id_order: element.right.id,
              od_lense: element.right.lense,
              od_kcode: element.right.kcode,
              od_power: element.right.power,
              od_size: element.right.size,
              note_order_lens: element.right.note,
              price: element.right.price,
              status: element.right.status,
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
              status: element.left.status,
              prefix: element.prefix,
            },
          });
        }
        
      });
      return res.send({ status: "success", message: "", data: returnData });
    }
    return res.send({
      status: "error",
      message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
      data: "",
    });
  }
});

router.get("/:id", async (req, res) => {
  let result = await OrderLense.findByPk(req.params.id);
  if (result) {
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
        });

        let right = await Lense.create({
          lense: lense_R,
          kcode: kcode_R,
          power: power_R,
          size: side_R,
          note: req.body.note_order_lens,
          side: "R",
          prefix: req.body.prefixRight,
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
            date_examination: new Date().toString(),
            type: req.body.type,
            id_lense_left: left.id,
            id_lense_right: right.id,
            is_active: 1,
            order_number: order_number,
            paid: req.body.paid,
            glass_money: req.body.glass_money,
            amount: req.body.amount,
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
