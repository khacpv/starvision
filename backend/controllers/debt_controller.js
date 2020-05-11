const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Customer = models.Customer;

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

    let customer = {};
    customer = await Customer.findAll({
      where: {
       id: doctorId
      },
    });

    if (customer) {
      let returnCustomer = [];
      customer.forEach((element) => {
        returnCustomer.push({
          id: element.id,
          congnothangtruoc: element.debt_last_month,
          phatsinhthangnay: element.costs_incurred_this_month,
          dathanhtoan: element.paid,
          tienkinh: element.glass_money,
          tienvtth: element.vtth_money,
          tien_phai_thanh_toan: Number(element.debt_last_month) + Number(element.costs_incurred_this_month) -  Number(element.costs_incurred_this_month)
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
module.exports = router;
