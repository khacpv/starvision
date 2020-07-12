const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Customer = models.Customer;
const OrderLense = models.OrderLense;
const Lense = models.Lense;
const { check, validationResult } = require("express-validator");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

router.get(
  "/",
  [check("id_bacsi", "Chưa điền thông tin tên bác sĩ.").not().isEmpty()],
  async (req, res) => {
    let doctorId = req.query.id_bacsi;

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: "error",
        message: errors.array()[0].msg,
        data: "",
      });
    }

    let dathanhtoan = 0;
    let tienkinh = 0;
    let orderLense = await OrderLense.findAll({
      where: {
        customer_id: doctorId,
      },
    });
    orderLense.forEach((odl) => {
      let amount = odl.amount ? odl.amount : 1;
      let glass_money = odl.glass_money ? odl.glass_money : 0;
      tienkinh += glass_money * amount;
      dathanhtoan += odl.paid;
    });

    let dept = {};
    dept = await Customer.findOne({
      where: {
        id: doctorId,
      },
      attributes: {
        exclude: ["id"],
      },
    });

    if (dept) {
      let tienvtth = dept.vtth_money != null ? dept.vtth_money : 0;

      let congnothangtruoc =
        dept.debt_last_month != null ? dept.debt_last_month : 0;
      let phatsinhthangnay = tienkinh + tienvtth;
      dathanhtoan = dathanhtoan;
      tienkinh = tienkinh;

      dept = {
        cong_no_thang_truoc: String(congnothangtruoc),
        phat_sinh_thang_nay: String(phatsinhthangnay),
        da_thanh_toan: String(dathanhtoan),
        tien_kinh: String(tienkinh),
        tien_vtth: String(tienvtth),
        tien_phai_thanh_toan: String(
          congnothangtruoc + phatsinhthangnay - dathanhtoan
        ),
      };

      res.send({
        status: "success",
        message: "",
        data: dept,
      });
    }
  }
);
module.exports = router;
