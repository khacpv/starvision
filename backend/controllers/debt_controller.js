const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Customer = models.Customer;
const OrderLense = models.OrderLense;
const Lense = models.Lense;
const Doctors = models.Doctors;
const { check, validationResult } = require("express-validator");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

router.get(
  "/",
  [check("id_bacsi", "Chưa điền thông tin tên bác sĩ.").not().isEmpty()],
  async (req, res) => {
    try {
      let doctorId = req.query.id_bacsi;
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send({
          status: "error",
          message: errors.array()[0].msg,
          data: "",
        });
      }

      let totalPaid = 0;
      let totalGlassMoney = 0;
      let debtLastMonth = 0;
      let debtThisMonth = 0;

      const date = new Date();
      const firstDayThisMonth = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      );
      const lastDayThisMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      );

      const firstDayLastMonth = new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        1
      );
      const lastDayLastMonth = new Date(date.getFullYear(), date.getMonth(), 0);
      let orderLense = await OrderLense.findAll({
        where: {
          customer_id: doctorId,
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
      orderLense.forEach((odl) => {
        const leftAmount = odl.left ? odl.left.amount : 1;
        const rightAmount = odl.right ? odl.right.amount : 1;

        const leftGlassMoney = odl.left ? odl.left.glass_money : 0;
        const rightGlassMoney = odl.right ? odl.right.glass_money : 0;

        totalGlassMoney +=
          leftAmount * leftGlassMoney + rightAmount * rightGlassMoney;
        const leftPaid = odl.left ? odl.left.paid : 0;
        const rightPaid = odl.right ? odl.right.paid : 0;

        totalPaid += leftPaid + rightPaid;

        if (odl.createdAt <= lastDayLastMonth) {
          debtLastMonth +=
            leftAmount * leftGlassMoney +
            rightAmount * rightGlassMoney -
            (leftPaid + rightPaid);
        }
        if (odl.createdAt >= firstDayThisMonth && odl.createdAt < new Date()) {
          debtThisMonth +=
            leftAmount * leftGlassMoney +
            rightAmount * rightGlassMoney -
            (leftPaid + rightPaid);
        }
      });

      let dept = {};
      dept = await Doctors.findOne({
        where: {
          id: doctorId,
        },
        attributes: {
          exclude: ["id"],
        },
      });
      if (dept) {
        let vtthMoney = dept.vtth_money != null ? dept.vtth_money : 0;

        // let congnothangtruoc =
        //   dept.debt_last_month != null ? dept.debt_last_month : 0;
        // let phatsinhthangnay = tienkinh + tienvtth;

        dept = {
          cong_no_thang_truoc: String(debtLastMonth),
          phat_sinh_thang_nay: String(debtThisMonth + vtthMoney),
          da_thanh_toan: String(totalPaid),
          tien_kinh: String(totalGlassMoney),
          tien_vtth: String(vtthMoney),
          tien_phai_thanh_toan: String(
            debtLastMonth + debtThisMonth + vtthMoney - totalPaid
          ),
        };

        res.send({
          status: "success",
          message: "",
          data: dept,
        });
      } else {
        return res.send({
          status: "error",
          message: "Không tìm thấy bác sĩ",
          data: "",
        });
      }
    } catch (error) {
      return res.send({
        status: "error",
        message: errors,
        data: "",
      });
    }
  }
);
module.exports = router;
