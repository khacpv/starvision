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
      dept = {
        congnothangtruoc: String(
          dept.debt_last_month != null ? dept.debt_last_month : 0
        ),
        phatsinhthangnay: String(
          dept.costs_incurred_this_month != null
            ? dept.costs_incurred_this_month
            : 0
        ),
        dathanhtoan: String(dept.paid != null ? dept.paid : 0),
        tienkinh: String(dept.glass_money != null ? dept.glass_money : 0),
        tienvtth: String(dept.vtth_money != null ? dept.vtth_money : 0),
        tien_phai_thanh_toan: String(
          Number(dept.glass_money) +
            Number(tienvtth) +
            Number(dept.debt_last_month) +
            Number(dept.costs_incurred_this_month) -
            Number(dept.paid)
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
