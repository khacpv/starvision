const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Fitting = models.Fitting;
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  let customerId = req.query.khid;
  let dttcId = req.query.iddttc;

  let result = await Fitting.findAll({
    where: {
      customer_id: customerId,
      dttc_id: dttcId,
    },
  });
  if (result) {
    let custom_result = [];
    result.forEach((element) => {
      let tmpSide = element.side;
      let key = "od";
      if (tmpSide == "L") {
        key = "os";
      }
      custom_result.push({
        fitting_no: element.fitting_no,
        [tmpSide]: {
          id: element.id,
          [key + "_kcode"]: element.kcode,
          [key + "_power"]: element.power,
          [key + "_size"]: element.size,
          [key + "_bcva_sph"]: element.bcva_sph,
          [key + "_bcva_cyl"]: element.bcva_cyl,
          [key + "_bcva_ax"]: element.bcva_ax,
          [key + "_bcva_va"]: element.bcva_va,
          [key + "_referaction_sph"]: element.referaction_sph,
          [key + "_referaction_cyl"]: element.referaction_cyl,
          [key + "_referaction_ax"]: element.referaction_ax,
          [key + "_comment_size"]: element.comment_size,
          [key + "_comment_vung_dieu_tri"]: element.comment_vung_dieu_tri,
          [key + "_comment_matbo"]: element.comment_matbo,
          [key + "_comment_di_chuyen"]: element.comment_di_chuyen,
          [key + "_comment_ket_luan"]: element.comment_ket_luan,
          [key + "_video"]: element.video,
          [key + "_thumb"]: element.thumb,
        },
      });
    });
    return res.send({
      status: "success",
      message: "",
      data: custom_result,
    });
  } else {
    return res.send({
      status: "success",
      message: "",
      data: [],
    });
  }
  return res.send({ code: 400, msg: "error" });
});

router.post(
  "/",
  [
    check("khid", "Không tìm thấy thông tin khách hàng!"),
    check("iddttc", "Không tìm thấy thông tin người lập!"),
    check("idbacsi", "Không tìm thấy thông tin bác sĩ!"),
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
    let checkFitting = null;
    if (req.body.id) {
      checkFitting = await Fitting.findOne({
        where: {
          customer_id: req.body.khid,
          dttc_id: req.body.iddttc,
          id: req.body.id,
          side: req.body.side,
        },
      });
    }

    if (checkFitting) {
      let updateFitting = Fitting.update(
        {
          doctor_code: req.body.mabacsi,
          doctor_id: req.body.idbacsi,
          customer_id: req.body.khid,
          dttc_id: req.body.iddttc,
          date_examination: req.body.ngaykham,
          fitting_no: req.body.fitting_no,
          referaction_sph: req.body.referaction_sph,
          referaction_cyl: req.body.referaction_cyl,
          referaction_ax: req.body.referaction_ax,
          bcva_va: req.body.bcva_va,
          bcva_sph: req.body.bcva_sph,
          bcva_cyl: req.body.bcva_cyl,
          bcva_ax: req.body.bcva_ax,

          kcode: req.body.kcode,
          power: req.body.power,
          comment_size: req.body.comment_size,
          comment_matbo: req.body.comment_matbo,
          comment_vung_dieu_tri: req.body.comment_vung_dieu_tri,
          comment_di_chuyen: req.body.comment_di_chuyen,
          comment_ket_luan: req.body.comment_ket_luan,
          video: req.body.video,
          thumb: req.body.thumb,
        },
        {
          where: {
            id: checkFitting.id,
          },
        }
      );

      if (updateFitting) {
        return res.send({
          status: "success",
          message: "",
          data: "",
        });
      }
    }

    let result = await Fitting.create({
      doctor_code: req.body.mabacsi,
      doctor_id: req.body.idbacsi,
      customer_id: req.body.khid,
      dttc_id: req.body.iddttc,
      date_examination: req.body.ngaykham,
      fitting_no: req.body.fitting_no,
      referaction_sph: req.body.referaction_sph,
      referaction_cyl: req.body.referaction_cyl,
      referaction_ax: req.body.referaction_ax,
      bcva_va: req.body.bcva_va,
      bcva_sph: req.body.bcva_sph,
      bcva_cyl: req.body.bcva_cyl,
      bcva_ax: req.body.bcva_ax,
      side: req.body.side,
      size: req.body.size,
      kcode: req.body.kcode,
      power: req.body.power,
      comment_size: req.body.comment_size,
      comment_matbo: req.body.comment_matbo,
      comment_vung_dieu_tri: req.body.comment_vung_dieu_tri,
      comment_di_chuyen: req.body.comment_di_chuyen,
      comment_ket_luan: req.body.comment_ket_luan,
      video: req.body.video,
      thumb: req.body.thumb,
    });
    if (result) {
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

router.put("/:id", async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({
      status: "error",
      message: errors.array()[0].msg,
      data: "",
    });
  }
  let result = Fitting.update(
    {
      doctor_code: req.body.mabacsi,
      doctor_id: req.body.idbacsi,
      customer_id: req.body.khid,
      dttc_id: req.body.iddttc,
      date_examination: req.body.ngaykham,
      fitting_no: req.body.fitting_no,
      referaction_sph: req.body.referaction_sph,
      referaction_cyl: req.body.referaction_cyl,
      referaction_ax: req.body.referaction_ax,
      bcva_va: req.body.bcva_va,
      bcva_sph: req.body.bcva_sph,
      bcva_cyl: req.body.bcva_cyl,
      bcva_ax: req.body.bcva_ax,
      side: req.body.side,
      kcode: req.body.kcode,
      power: req.body.power,
      comment_size: req.body.comment_size,
      comment_matbo: req.body.comment_matbo,
      comment_vung_dieu_tri: req.body.comment_vung_dieu_tri,
      comment_di_chuyen: req.body.comment_di_chuyen,
      comment_ket_luan: req.body.comment_ket_luan,
      video: req.body.video,
      thumb: req.body.thumb,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  if (result) {
    return res.send({ code: 200, msg: "success", items: result });
  }

  return res.send({ code: 200, msg: "error" });
});

router.delete("/:id", async (req, res) => {
  let result = await Fitting.destroy({
    where: { id: req.params.id },
  });
  if (result) {
    return res.send({ code: 200, msg: "success" });
  }
  return res.send({ code: 400, msg: "error" });
});

module.exports = router;
