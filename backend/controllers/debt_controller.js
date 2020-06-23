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
      let congnothangtruoc =
        dept.debt_last_month != null ? dept.debt_last_month : 0;
      let phatsinhthangnay =
        dept.costs_incurred_this_month != null
          ? dept.costs_incurred_this_month
          : 0;
      let dathanhtoan = dept.paid != null ? dept.paid : 0;
      let tienkinh = dept.glass_money != null ? dept.glass_money : 0;
      let tienvtth = dept.vtth_money != null ? dept.vtth_money : 0;

      dept = {
        congnothangtruoc: String(congnothangtruoc),
        phatsinhthangnay: String(phatsinhthangnay),
        dathanhtoan: String(dathanhtoan),
        tienkinh: String(tienkinh),
        tienvtth: String(tienvtth),
        tien_phai_thanh_toan: String(
          tienkinh +
            tienvtth +
            congnothangtruoc +
            phatsinhthangnay -
            dathanhtoan
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
