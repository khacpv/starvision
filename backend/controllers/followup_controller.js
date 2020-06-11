const express = require("express");
const router = express.Router();
const models = require("../models/index");
const FollowUp = models.FollowUp;
const FollowUpCheck = models.FollowUpCheck;
const { check, validationResult } = require("express-validator");
const sequelize = require("../config/db").sequelize;
const Sequelize = require("sequelize");
const { Op } = Sequelize;

router.get("/", async (req, res) => {
  let userId = req.query.userid;
  let dttcId = req.query.iddttc;
  let result = await FollowUpCheck.findAll({
    where: {
      customer_id: userId,
      dttc_id: dttcId,
    },
    include: [
      {
        model: FollowUp,
        as: "left",
      },
      {
        model: FollowUp,
        as: "right",
      },
    ],
  });

  if (`${result.length}` > 0) {
    let R,
      L = null;
    let returnData = [];
    let index = 1;
    result.forEach((element) => {
      let key = "od";
      if (element.side == "L") {
        key = "os";
      }
      R = {
        A_TH_DUBAO: element.right.id,
        od_bcva_va: element.right.bcva_va,
        od_image: element.right.image,
        od_video: element.right.video,
        od_thumb: element.right.thumb,
      };

      L = {
        A_TH_DUBAO: element.left.id,
        os_bcva_va: element.left.bcva_va,
        os_image: element.left.image,
        os_video: element.left.video,
        os_thumb: element.left.thumb,
        
      };

      let tmpSide = element.side;
      returnData.push({
        followup_no: element.followup_no,
        comment: element.note,
        ngaykham: element.date_examination,
        ngaytaikham: element.re_examination_date,
        ...(R != null && { R: R }),
        ...(L != null && { L: L }),
      });
    });
    return res.send({
      status: "success",
      message: "",
      data: returnData,
    });
  } else {
    return res.send({
      status: "success",
      message: "",
      data: null,
    });
  }
  return res.send({ code: 400, msg: "error" });
});

router.post(
  "/",
  [
    check("ngaykham", "Ngày kiểm tra mắt chưa có dữ liệu.").not().isEmpty(),
    check("iddttc", "Không tìm thấy thông tin người lập!").not().isEmpty(),
    check("khid", "Không tìm thấy thông tin khách hàng!").not().isEmpty(),
    check("idbacsi", "Không tìm thấy thông tin bác sĩ!").not().isEmpty(),
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: "error",
        message: errors.array()[0].msg,
        data: "",
      });
    }

    let bcva_va_R = req.body.bcva_va_R;
    let video_R = req.body.video_R;
    let thumb_R = req.body.thumb_R;
    let image_R = req.body.image_R;

    let bcva_va_L = req.body.bcva_va_L;
    let video_L = req.body.video_L;
    let thumb_L = req.body.thumb_L;
    let image_L = req.body.image_L;

    if (bcva_va_R == null || bcva_va_R == "") {
      res.send({
        status: "error",
        message: "Mắt phải cần nhập đủ dữ liệu!",
        data: "",
      });
    }

    if (bcva_va_L == null || bcva_va_L == "") {
      res.send({
        status: "error",
        message: "Mắt trái cần nhập đủ dữ liệu",
        data: "",
      });
    }

    let transaction;
    let left = null;
    let right = null;
    let checkFollowup = 0;
    // update
    if (req.body.id_left && req.body.id_right) {
      checkFollowup = await FollowUp.count({
        where: {
          customer_id: req.body.khid,
          dttc_id: req.body.iddttc,
          id: {
            [Op.or]: [req.body.id_left, req.body.id_right],
          },
        },
      });
    }

    if (checkFollowup > 0) {
      try {
        // get transaction
        transaction = await sequelize.transaction();

        right = await FollowUp.update(
          {
            doctor_code: req.body.mabacsi,
            doctor_id: req.body.idbacsi,
            date_examination: req.body.ngaykham,
            re_examination_date: req.body.ngaytaikham,
            note: req.body.note,
            bcva_va: bcva_va_R,
            image: image_R,
            video: video_R,
            thumb: thumb_R,
          },
          {
            where: {
              customer_id: req.body.khid,
              dttc_id: req.body.iddttc,
              id: req.body.id_right,
              side: "R",
            },
          }
        );
        left = await FollowUp.update(
          {
            doctor_code: req.body.mabacsi,
            doctor_id: req.body.idbacsi,
            date_examination: req.body.ngaykham,
            re_examination_date: req.body.ngaytaikham,
            note: req.body.note,
            bcva_va: bcva_va_L,
            image: image_L,
            video: video_L,
            thumb: thumb_L,
          },
          {
            where: {
              customer_id: req.body.khid,
              dttc_id: req.body.iddttc,
              id: req.body.id_left,
              side: "L",
            },
          }
        );

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

      if (left && right) {
        return res.send({
          status: "success",
          message: "update",
          data: "",
        });
      }
    }

    // Create
    try {
      // get transaction
      transaction = await sequelize.transaction();

      right = await FollowUp.create({
        followup_no: 1,
        note: req.body.note,
        side: "R",
        bcva_va: bcva_va_R,
        image: image_R,
        video: video_R,
        thumb: thumb_R,
      });

      left = await FollowUp.create({
        followup_no: 2,
        note: req.body.note,
        side: "L",
        bcva_va: bcva_va_L,
        image: image_L,
        video: video_L,
        thumb: thumb_L,
      });
      if (left && right) {
        await FollowUpCheck.create({
          doctor_code: req.body.mabacsi,
          doctor_id: req.body.idbacsi,
          customer_id: req.body.khid,
          dttc_id: req.body.iddttc,
          date_examination: req.body.ngaykham,
          re_examination_date: req.body.ngaytaikham,
          id_left: left.id,
          id_right: right.id,
          note: req.body.note
        });
        return res.send({
          status: "success",
          message: "",
          data: "",
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

    return res.send({
      status: "error",
      message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
      data: "",
    });
  }
);

router.put(
  "/:id",
  [
    check("ngaykham", "Ngày kiểm tra mắt chưa có dữ liệu.").not().isEmpty(),
    check("iddttc", "Không tìm thấy thông tin người lập!").not().isEmpty(),
    check("khid", "Không tìm thấy thông tin khách hàng!").not().isEmpty(),
    check("idbacsi", "Không tìm thấy thông tin bác sĩ!").not().isEmpty(),
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: "error",
        message: errors.array()[0].msg,
        data: "",
      });
    }
    let transaction;
    let result = null;
    try {
      // get transaction
      transaction = await sequelize.transaction();

      result = await FollowUp.update(
        {
          doctor_code: req.body.mabacsi,
          doctor_id: req.body.idbacsi,
          customer_id: req.body.khid,
          dttc_id: req.body.iddttc,
          date_examination: req.body.ngaykham,
          followup_no: req.body.followup_no,
          note: req.body.note,
          side: req.body.side,
          bcva_va: req.body.bcva_va,
          image: req.body.image,
          video: req.body.video,
          thumb: req.body.thumb,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

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
      res.send({
        status: "success",
        message: "",
        data: "",
      });
    }

    res.send({ code: 200, msg: "error" });
  }
);

router.delete("/:id", async (req, res) => {
  let result = await FollowUp.destroy({
    where: { id: req.params.id },
  });
  if (result) {
    res.send({ code: 200, msg: "success" });
  }
  res.send({ code: 400, msg: "error" });
});

module.exports = router;
