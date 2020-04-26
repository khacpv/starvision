const express = require("express");
const router = express.Router();
const models = require("../models/index");
const FollowUp = models.FollowUp;
const { check, validationResult } = require("express-validator");
const sequelize = require("../config/db").sequelize;

router.get("/", async (req, res) => {
  let userId = req.query.userid;
  let dttcId = req.query.iddttc;

  let result = await FollowUp.findAll({
    where: {
      customer_id: userId,
      dttc_id: dttcId,
    }
  });

  if (result) {
    let returnData = [];
    let index = 1;
    result.forEach(element => {
      let key = 'od';
      if (element.size == 'L'){
        key = 'os';
      }
      let tmpSide = element.type;
      returnData.push({
        followup_no: index++,
        comment: element.note,
        ngaykham: element.date_examination,
        [tmpSide]: {
          [key + '_bcva_va']: element.bcva_va,
          [key + '_image']: element.image,
          [key + '_video']: element.video,
          [key + '_thumb']: element.thumb,
          A_TH_DUBAO: element.id
        }
        
      });
    });
    return res.send({ 
      status: "success", 
      message: '',
      data: returnData 
    });
  }
  return res.send({ code: 400, msg: "error" });
});

router.get("/:id", async (req, res) => {
  let result = await FollowUp.findByPk(req.params.id);
  if (result) {
    res.send({ code: 200, msg: "success", items: data });
  }
  res.send({ code: 400, msg: "error" });
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

    if (
      (bcva_va_R != "" && (video_R == "" || image_R == "")) ||
      (bcva_va_R == "" && video_R == "" && image_R != "") ||
      ((bcva_va_R == "" || image_R == "") && video_R != "")
    ) {
      res.send({
        status: "error",
        message: "Mắt phải cần nhập đủ dữ liệu!",
        data: "",
      });
    }

    if (
      (bcva_va_L != "" && (video_L == "" || image_L == "")) ||
      (bcva_va_L == "" && video_L == "" && image_L != "") ||
      ((bcva_va_L == "" || image_L == "") && video_L != "")
    ) {
      res.send({
        status: "error",
        message: "Mắt trái cần nhập đủ dữ liệu",
        data: "",
      });
    }

    let transaction;
    let left = null;
    let right = null;

    // update
    let checkFollowup = await FollowUp.count({
      where:{
        customer_id: req.body.khid,
        dttc_id: req.body.iddttc,
      }
    });


    if (checkFollowup > 0){
      try {
        // get transaction
        transaction = await sequelize.transaction();
  
        right = await FollowUp.update({
          doctor_code: req.body.mabacsi,
          doctor_id: req.body.idbacsi,
   
          date_examination: req.body.ngaykham,
  
          comment: req.body.note,
          bcva_va: bcva_va_R,
          image: image_R,
          video: video_R,
          thumb: thumb_R,
        },{
          where:{
            customer_id: req.body.khid,
            dttc_id: req.body.iddttc,
            type: "R",
          }
        });
        left = await FollowUp.update({
          doctor_code: req.body.mabacsi,
          doctor_id: req.body.idbacsi,

          date_examination: req.body.ngaykham,
  
          comment: req.body.note,

          bcva_va: bcva_va_L,
          image: image_L,
          video: video_L,
          thumb: thumb_L,
        },{
          where:{
            customer_id: req.body.khid,
            dttc_id: req.body.iddttc,
            type: "L",
          }
        });
  
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
          message: "",
          data: "",
        });
      }
    }
    
    // Create
    try {
      // get transaction
      transaction = await sequelize.transaction();

      right = await FollowUp.create({
        doctor_code: req.body.mabacsi,
        doctor_id: req.body.idbacsi,
        customer_id: req.body.khid,
        dttc_id: req.body.iddttc,
        date_examination: req.body.ngaykham,

        comment: req.body.note,
        type: "R",
        bcva_va: bcva_va_R,
        image: image_R,
        video: video_R,
        thumb: thumb_R,
      });
      left = await FollowUp.create({
        doctor_code: req.body.mabacsi,
        doctor_id: req.body.idbacsi,
        customer_id: req.body.khid,
        dttc_id: req.body.iddttc,
        date_examination: req.body.ngaykham,

        comment: req.body.note,
        type: "L",
        bcva_va: bcva_va_L,
        image: image_L,
        video: video_L,
        thumb: thumb_L,
      });

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
        message: "",
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
          comment: req.body.comment,
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
