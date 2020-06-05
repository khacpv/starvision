const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Customer = models.Customer;
const CustomerOk = models.CustomerOk;
const CustomerCheck = models.CustomerCheck;
const Fitting = models.Fitting;
const OrderLense = models.OrderLense;
const Lense = models.Lense;
const { check, validationResult } = require("express-validator");
const Sequelize = require("sequelize");
const { Op } = Sequelize;
const CONSTANT = require("../config/constants.json");
router.get(
  "/",
  [check("tenbacsi", "Chưa điền thông tin tên bác sĩ.").not().isEmpty()],
  async (req, res) => {
    let doctorName = req.query.tenbacsi;

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: "error",
        message: errors.array()[0].msg,
        data: "",
      });
    }

    let customer = {};
    customer = await Customer.findAll({
      where: {
        [Op.and]: [
          {
            doctor_name: {
              [Op.like]: `%${doctorName}%`,
            },
          },
        ],
      },
    });

    if (customer) {
      let returnCustomer = [];
      let current_date = element.birthday;
      let formatted_date =
        current_date.getDate() +
        "/" +
        current_date.getMonth() +
        1 +
        "/" +
        current_date.getFullYear();
      customer.forEach((element) => {
        returnCustomer.push({
          ID_KHACHHANG: element.id,
          NAMSINH: formatted_date,
          TENKHACHHANG: element.customer_name,
          DIDONG: element.mobile,
          GIOITINH: element.gender,
          DIACHI: element.address,
        });
      });

      res.send({
        status: "success",
        message: "",
        data: returnCustomer,
      });
    }
  }
);

router.get(
  "/search",
  [check("d_name", "Chưa điền thông tin tên bác sĩ.").not().isEmpty()],
  async (req, res) => {
    const doctorName = req.query.d_name;
    let customerName = req.query.c_name;
    let from = req.query.from;
    let to = req.query.to;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: "error",
        message: errors.array()[0].msg,
        data: "",
      });
    }

    if (Number(from) > Number(to)) {
      res.send({
        status: "error",
        message: "Lỗi phân trang.",
        data: "",
      });
    }
    let customer = {};
    if (from && to) {
      customer = await Customer.findAll({
        offset: Number(from - 1),
        limit: Number(to) - Number(from) + 1,
        where: {
          [Op.and]: [
            {
              doctor_name: {
                [Op.like]: `%${doctorName}%`,
              },
              customer_name: {
                [Op.like]: `%${customerName}%`,
              },
            },
          ],
        },
      });
    } else {
      customer = await Customer.findAll({
        where: {
          [Op.and]: [
            {
              doctor_name: {
                [Op.like]: `%${doctorName}%`,
              },
              customer_name: {
                [Op.like]: `%${customerName}%`,
              },
            },
          ],
        },
      });
    }

    if (customer) {
      let returnCustomer = [];
      customer.forEach((element) => {
        returnCustomer.push({
          ID_KHACHHANG: element.id,
          NAMSINH: element.birthday != null ? element.birthday : "",
          TENKHACHHANG: element.customer_name,
          DIDONG: element.mobile,
          GIOITINH: element.gender,
          DIACHI: element.address,
        });
      });

      res.send({
        status: "success",
        message: "",
        data: returnCustomer,
      });
    }
  }
);

router.get(
  "/history",
  [check("d_name", "Chưa điền thông tin tên bác sĩ.").not().isEmpty()],
  async (req, res) => {
    const doctorName = req.query.d_name;
    let customerName = req.query.c_name;
    let from = req.query.from;
    let to = req.query.to;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: "error",
        message: errors.array()[0].msg,
        data: "",
      });
    }

    if (Number(from) > Number(to)) {
      res.send({
        status: "error",
        message: "Lỗi phân trang.",
        data: "",
      });
    }
    let customer = {};
    if (from && to) {
      customer = await Customer.findAll({
        offset: Number(from - 1),
        limit: Number(to) - Number(from) + 1,
        where: {
          [Op.and]: [
            {
              doctor_name: {
                [Op.like]: `%${doctorName}%`,
              },
              customer_name: {
                [Op.like]: `%${customerName}%`,
              },
            },
          ],
        },
      });
    } else {
      customer = await Customer.findAll({
        where: {
          [Op.and]: [
            {
              doctor_name: {
                [Op.like]: `%${doctorName}%`,
              },
              customer_name: {
                [Op.like]: `%${customerName}%`,
              },
            },
          ],
        },
      });
    }

    if (customer) {
      let returnCustomer = [];
      customer.forEach((element) => {
        returnCustomer.push({
          ID_KHACHHANG: element.id,
          NAMSINH: element.birthday,
          TENKHACHHANG: element.customer_name,
          DIDONG: element.mobile,
          GIOITINH: element.gender,
          DIACHI: element.address,
        });
      });

      res.send({
        status: "success",
        message: "",
        data: returnCustomer,
      });
    }
  }
);

router.post(
  "/",
  [
    check("iddttc", "IDDTTC không được bỏ trống.").not().isEmpty(),
    check("birthday", "Ngày sinh không được bỏ trống.").not().isEmpty(),
  ],
  async (req, res) => {
    let data = req.body;
    let errors = validationResult(req);
    let count = (await Customer.count({})) + 1;
    let makh = data.mabacsi + ".KH" + count;
    if (!errors.isEmpty()) {
      return res.send({
        status: "error",
        message: errors.array()[0].msg,
        data: "",
      });
    } else {
      let check_customer = await Customer.findOne({
        where: {
          customer_name: data.tenkh,
          mobile: data.mobile,
          birthday: data.birthday,
        },
      });
      if (check_customer) {
        return res.send({
          status: "error",
          message: "Tên khách hàng đã tồn tại trong hệ thống.",
          data: "",
        });
      }
      let customer = await Customer.create({
        customer_code: makh,
        customer_name: data.tenkh,
        doctor_id: data.mabacsi,
        doctor_name: data.tenbacsi,
        mobile: data.mobile,
        address: data.diachi,
        birthday: data.birthday,
        note: data.ghichu,
        data_group: 1,
        dttc_name: data.tendttc,
        gender: data.gender,
        customer_type: 300,
        dttc_id: data.iddttc,
      });
      if (customer) {
        return res.send({
          status: "success",
          message: "",
          data: [
            {
              ID_KHACHHANG: customer.id,
              NAMSINH: customer.birthday,
              TENKHACHHANG: customer.customer_name,
              DIDONG: customer.mobile,
              GIOITINH: customer.gender,
              DIACHI: customer.address,
            },
          ],
        });
      }
    }
  }
);

router.get(
  "/forgotpass",
  [
    check("username", "Chưa điền thông tin người dùng.").not().isEmpty(),
    check("lienhe", "Chưa điền thông tin liên hệ").not().isEmpty(),
  ],
  async (req, res) => {
    let username = req.query.username;
    let contact = req.query.lienhe;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: "error",
        message: errors.array()[0].msg,
        data: "",
      });
    }
    res.send({
      status: "success",
      message:
        "Cảm ơn bạn đã gửi yêu cầu. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.",
      data: "",
    });
  }
);

router.get(
  "/not_customok",
  [check("tenbacsi", "Chưa điền thông tin tên bác sĩ.").not().isEmpty()],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: "error",
        message: errors.array()[0].msg,
        data: "",
      });
    }

    let customerCheck = await CustomerCheck.findAll({
      where: {
        type: CONSTANT.CustomerOk.GOV,
      },
      include: [
        {
          model: Customer,
          as: "customer",
        },
      ],
    });
    const customerIdOk = new Set();
    customerCheck.forEach((element) => {
      if (element.customer) {
        customerIdOk.add(element.customer.id);
      }
    });
    let customerIdOkArr = Array.from(customerIdOk);

    let customer = await Customer.findAll({
      where: {
        doctor_name: req.query.tenbacsi,
        id: {
          [Op.notIn]: customerIdOkArr,
        },
      },
    });
    if (customer || customerCheck) {
      let returnCustomer = [];
      customer.forEach((element) => {
        returnCustomer.push({
          ID_KHACHHANG: element.id,
          NAMSINH: element.birthday,
          TENKHACHHANG: element.customer_name,
          DIDONG: element.mobile,
          GIOITINH: element.gender,
          DIACHI: element.address,
        });
      });

      return res.send({
        status: "success",
        message: "",
        data: returnCustomer,
      });
    }
    return res.send({
      status: "error",
      message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
      data: "",
    });
  }
);

router.get(
  "/not_fitting",
  [check("tenbacsi", "Chưa điền thông tin tên bác sĩ.").not().isEmpty()],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: "error",
        message: errors.array()[0].msg,
        data: "",
      });
    }

    let fitting = await Fitting.findAll({
      include: [
        {
          model: Customer,
          as: "customer",
        },
      ],
    });

    const fittingIdOk = new Set();
    fitting.forEach((element) => {
      if (element.customer) {
        fittingIdOk.add(element.customer.id);
      }
    });
    let fittingIdOkArr = Array.from(fittingIdOk);

    let customer = await Customer.findAll({
      where: {
        doctor_name: req.query.tenbacsi,
        id: {
          [Op.notIn]: fittingIdOkArr,
        },
      },
    });
    if (customer) {
      let returnCustomer = [];
      customer.forEach((element) => {
        returnCustomer.push({
          ID_KHACHHANG: element.id,
          NAMSINH: element.birthday != null ? element.birthday : "",
          TENKHACHHANG: element.customer_name,
          DIDONG: element.mobile,
          GIOITINH: element.gender,
          DIACHI: element.address,
        });
      });

      return res.send({
        status: "success",
        message: "",
        data: returnCustomer,
      });
    } else {
      return res.send({
        status: "success",
        message: "",
        data: [],
      });
    }
    return res.send({
      status: "error",
      message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
      data: "",
    });
  }
);

router.get(
  "/fitting",
  [check("tenbacsi", "Chưa điền thông tin tên bác sĩ.").not().isEmpty()],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: "error",
        message: errors.array()[0].msg,
        data: "",
      });
    }

    let fitting = await Fitting.findAll({
      include: [
        {
          model: Customer,
          as: "customer",
        },
      ],
    });

    const fittingIdOk = new Set();
    fitting.forEach((element) => {
      if (element.customer) {
        fittingIdOk.add(element.customer.id);
      }
    });
    let fittingIdOkArr = Array.from(fittingIdOk);

    let customer = await Customer.findAll({
      where: {
        doctor_name: req.query.tenbacsi,
        customer_name: {
          [Op.like]: `%${req.query.tenkhachhang}%`,
        },
        id: fittingIdOkArr,
      },
    });
    if (customer) {
      let returnCustomer = [];
      customer.forEach((element) => {
        returnCustomer.push({
          ID_KHACHHANG: element.id,
          NAMSINH: element.birthday != null ? element.birthday : "",
          TENKHACHHANG: element.customer_name,
          DIDONG: element.mobile,
          GIOITINH: element.gender,
          DIACHI: element.address,
        });
      });

      return res.send({
        status: "success",
        message: "",
        data: returnCustomer,
      });
    }
    return res.send({
      status: "error",
      message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
      data: "",
    });
  }
);

router.get(
  "/not_customok_soft",
  [check("tenbacsi", "Chưa điền thông tin tên bác sĩ.").not().isEmpty()],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: "error",
        message: errors.array()[0].msg,
        data: "",
      });
    }

    let customerCheck = await CustomerCheck.findAll({
      where: {
        type: CONSTANT.CustomerOk.SOFT,
      },
      include: [
        {
          model: Customer,
          as: "customer",
        },
      ],
    });

    const customerIdOk = new Set();
    customerCheck.forEach((element) => {
      if (element.customer) {
        customerIdOk.add(element.customer.id);
      }
    });
    let customerIdOkArr = Array.from(customerIdOk);

    let customer = await Customer.findAll({
      where: {
        doctor_name: req.query.tenbacsi,
        id: {
          [Op.notIn]: customerIdOkArr,
        },
      },
    });
    if (customer || customerCheck) {
      let returnCustomer = [];
      customer.forEach((element) => {
        returnCustomer.push({
          ID_KHACHHANG: element.id,
          NAMSINH: element.birthday,
          TENKHACHHANG: element.customer_name,
          DIDONG: element.mobile,
          GIOITINH: element.gender,
          DIACHI: element.address,
        });
      });

      return res.send({
        status: "success",
        message: "",
        data: returnCustomer,
      });
    }
    return res.send({
      status: "error",
      message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
      data: "",
    });
  }
);
module.exports = router;
