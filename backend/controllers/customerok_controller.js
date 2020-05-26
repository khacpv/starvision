const express = require("express");
const router = express.Router();
const models = require("../models/index");
const CustomerOk = models.CustomerOk;
const { check, validationResult } = require("express-validator");
const CONSTANT = require("../config/constants.json");

router.get("/", async (req, res) => {
  let customerId = req.query.khid;
  let dttcId = req.query.iddttc;
  let customerOdType = req.query.type;

  let data = await CustomerOk.findOne({
    where: {
      customer_id: customerId,
      dttc_id: dttcId,
      type: customerOdType,
    },
  });
  if (data) {
    let result = null;
    if (data.type == CONSTANT.CustomerOk.GOV) {
      result = {
        customOk: {
          type: data.type,
          customOk_R: {
            od_refactometer_sph: data.ref_sph_r,
            od_refactometer_cyl: data.ref_cyl_r,
            od_refactometer_ax: data.ref_ax_r,
            od_bcva_va: data.bcva_va_r,
            od_bcva_sph: data.bcva_sph_r,
            od_bcva_cyl: data.bcva_cyl_r,
            od_bcva_ax: data.bcva_ax_r,
            od_original_k1: data.d_k1_r,
            od_original_k2: data.d_k2_r,
            od_original_ave: data.d_ave_r,
            od_original_hvid: data.d_hvid_r,
            od_custom_ok_lense: data.customok_lense_r,
            od_custom_ok_k_code: data.customok_kcode_r,
            od_custom_ok_power: data.customok_power_r,
            od_custom_ok_size: data.customok_size_r,
            ngayfitting: data.createdAt,
          },
          customOk_L: {
            os_refactometer_sph: data.ref_sph_l,
            os_refactometer_cyl: data.ref_cyl_l,
            os_refactometer_ax: data.ref_ax_l,
            os_bcva_va: data.bcva_va_l,
            os_bcva_sph: data.bcva_sph_l,
            os_bcva_cyl: data.bcva_cyl_l,
            os_bcva_ax: data.bcva_ax_l,
            os_original_k1: data.d_k1_l,
            os_original_k2: data.d_k2_l,
            os_original_ave: data.d_ave_l,
            os_original_hvid: data.d_hvid_l,
            os_custom_ok_lense: data.customok_lense_l,
            os_custom_ok_k_code: data.customok_kcode_l,
            os_custom_ok_power: data.customok_power_l,
            os_custom_ok_size: data.customok_size_l,
            ngayfitting: data.createdAt,
          },
        },
      };
    } else {
      result = {
        customOk: {
          type: data.type,
          customOk_R: {
            sph: data.ref_sph_r,
            cyl: data.ref_cyl_r,
            hk: data.d_k1_r,
            vk: data.d_k2_r,
            power: data.customok_power_r,
            ngayfitting: data.createAt,
          },
          customOk_L: {
            sph: data.ref_sph_l,
            cyl: data.ref_cyl_l,
            hk: data.d_k1_l,
            vk: data.d_k2_l,
            power: data.customok_power_l,
            ngayfitting: data.createAt,
          },
        },
      };
    }

    return res.send({
      status: "success",
      message: "",
      data: result,
    });
  } else {
    return res.send({
      status: "success",
      message: "",
      data: {
        customOk: {
          customOk_R: [],
          customOk_L: [],
        },
      },
    });
  }

  return res.send({
    status: "error",
    message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
    data: "",
  });
});

router.get("/:id", async (req, res) => {
  let data = await CustomerOk.findByPk(req.params.id);
  let result = {
    customOk: {
      type: data.type,
      customOk_R: {
        od_refactometer_sph: data.ref_sph_r,
        od_refactometer_cyl: data.ref_cyl_r,
        od_refactometer_ax: data.ref_ax_r,
        od_bcva_va: data.bcva_va_r,
        od_bcva_sph: data.bcva_sph_r,
        od_bcva_cyl: data.bcva_cyl_r,
        od_bcva_ax: data.bcva_ax_r,
        od_original_k1: data.d_k1_r,
        od_original_k2: data.d_k2_r,
        od_original_ave: data.d_ave_r,
        od_original_hvid: data.d_hvid_r,
        od_custom_ok_lense: data.customok_lense_r,
        od_custom_ok_k_code: data.customok_kcode_r,
        od_custom_ok_power: data.customok_power_r,
        od_custom_ok_size: data.customok_size_r,
        ngayfitting: data.createAt,
      },
      customOk_L: {
        od_refactometer_sph: data.ref_sph_l,
        od_refactometer_cyl: data.ref_cyl_l,
        od_refactometer_ax: data.ref_ax_l,

        od_bcva_va: data.bcva_va_l,
        od_bcva_sph: data.bcva_sph_l,
        od_bcva_cyl: data.bcva_cyl_l,
        od_bcva_ax: data.bcva_ax_l,
        od_original_k1: data.d_k1_l,
        od_original_k2: data.d_k2_l,
        od_original_ave: data.d_ave_l,
        od_original_hvid: data.d_hvid_l,
        od_custom_ok_lense: data.customok_lense_l,
        od_custom_ok_k_code: data.customok_kcode_l,
        od_custom_ok_power: data.customok_power_l,
        od_custom_ok_size: data.customok_size_l,
        ngayfitting: data.createAt,
      },
    },
  };
  if (data) {
    res.send({
      status: "success",
      message: "",
      data: result,
    });
  }

  res.send({
    status: "error",
    message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
    message: "",
  });
});

router.post(
  "/",
  [
    check("iddttc", "Không tìm thấy thông tin người lập!").not().isEmpty(),
    check("khid", "Không tìm thấy thông tin khách hàng!").not().isEmpty(),
    check("idbacsi", "Không tìm thấy thông tin bác sĩ!").not().isEmpty(),
    check("type", "Không có thông tin loại sản phẩm").not().isEmpty(),
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
    let type = req.body.type;
    let checkCustomerOk = await CustomerOk.findOne({
      where: {
        customer_id: req.body.khid,
        dttc_id: req.body.iddttc,
        type: req.body.type,
      },
    });
    if (checkCustomerOk) {
      let updateCustomer = null;
      if (type == CONSTANT.CustomerOk.GOV) {
        updateCustomer = await CustomerOk.update(
          {
            doctor_code: req.body.mabacsi,
            doctor_id: req.body.idbacsi,
            date_examination: req.body.ngaykham,
            ref_sph_r: req.body.Ref_SPH_R,
            ref_cyl_r: req.body.Ref_CYL_R,
            ref_ax_r: req.body.Ref_AX_R,
            bcva_va_r: req.body.BCVA_VA_R,
            bcva_sph_r: req.body.BCVA_SPH_R,
            bcva_cyl_r: req.body.BCVA_CYL_R,
            bcva_ax_r: req.body.BCVA_AX_R,
            d_k1_r: req.body.D_K1_R,
            d_k2_r: req.body.D_K2_R,
            d_ave_r: req.body.D_AVE_R,
            d_hvid_r: req.body.D_HVID_R,
            customok_lense_r: req.body.customOk_Lense_R,
            customok_kcode_r: req.body.customOk_Kcode_R,
            customok_power_r: req.body.customOk_Power_R,
            customok_size_r: req.body.customOk_Size_R,
            ref_sph_l: req.body.Ref_SPH_L,
            ref_cyl_l: req.body.Ref_CYL_L,
            ref_ax_l: req.body.Ref_AX_L,
            bcva_va_l: req.body.BCVA_VA_L,
            bcva_sph_l: req.body.BCVA_SPH_L,
            bcva_cyl_l: req.body.BCVA_CYL_L,
            bcva_ax_l: req.body.BCVA_AX_L,
            d_k1_l: req.body.D_K1_L,
            d_k2_l: req.body.D_K2_L,
            d_ave_l: req.body.D_AVE_L,
            d_hvid_l: req.body.D_HVID_L,
            customok_lense_l: req.body.customOk_Lense_L,
            customok_kcode_l: req.body.customOk_Kcode_L,
            customok_power_l: req.body.customOk_Power_L,
            customok_size_l: req.body.customOk_Size_L,
          },
          {
            where: {
              id: checkCustomerOk.id,
            },
          }
        );
      }
      if (type == CONSTANT.CustomerOk.SOFT) {
        updateCustomer = await CustomerOk.update(
          {
            doctor_code: req.body.mabacsi,
            doctor_id: req.body.idbacsi,
            customer_id: req.body.khid,
            dttc_id: req.body.iddttc,
            date_examination: req.body.ngaykham,

            ref_sph_r: req.body.SPH_R,
            ref_cyl_r: req.body.CYL_R,
            d_k1_r: req.body.HK_R, // HK
            d_k2_r: req.body.VK_R, // VK
            customok_power_r: req.body.Power_R,

            ref_sph_l: req.body.SPH_L,
            ref_cyl_l: req.body.CYL_L,
            d_k1_l: req.body.HK_L, //HK
            d_k2_l: req.body.VK_L, //VK

            customok_power_l: req.body.Power_L,
            type: req.body.type,
          },
          {
            where: {
              id: checkCustomerOk.id,
            },
          }
        );
      }

      if (updateCustomer) {
        return res.send({
          status: "success",
          message: "",
          data: "",
        });
      }
    }
    let customerOk = null;
    if (type == CONSTANT.CustomerOk.GOV) {
      customerOk = await CustomerOk.create({
        doctor_code: req.body.mabacsi,
        doctor_id: req.body.idbacsi,
        customer_id: req.body.khid,
        dttc_id: req.body.iddttc,
        date_examination: req.body.ngaykham,
        ref_sph_r: req.body.Ref_SPH_R,
        ref_cyl_r: req.body.Ref_CYL_R,
        ref_ax_r: req.body.Ref_AX_R,
        bcva_va_r: req.body.BCVA_VA_R,
        bcva_sph_r: req.body.BCVA_SPH_R,
        bcva_cyl_r: req.body.BCVA_CYL_R,
        bcva_ax_r: req.body.BCVA_AX_R,
        d_k1_r: req.body.D_K1_R,
        d_k2_r: req.body.D_K2_R,
        d_ave_r: req.body.D_AVE_R,
        d_hvid_r: req.body.D_HVID_R,
        customok_lense_r: req.body.customOk_Lense_R,
        customok_kcode_r: req.body.customOk_Kcode_R,
        customok_power_r: req.body.customOk_Power_R,
        customok_size_r: req.body.customOk_Size_R,
        ref_sph_l: req.body.Ref_SPH_L,
        ref_cyl_l: req.body.Ref_CYL_L,
        ref_ax_l: req.body.Ref_AX_L,
        bcva_va_l: req.body.BCVA_VA_L,
        bcva_sph_l: req.body.BCVA_SPH_L,
        bcva_cyl_l: req.body.BCVA_CYL_L,
        bcva_ax_l: req.body.BCVA_AX_L,
        d_k1_l: req.body.D_K1_L,
        d_k2_l: req.body.D_K2_L,
        d_ave_l: req.body.D_AVE_L,
        d_hvid_l: req.body.D_HVID_L,
        customok_lense_l: req.body.customOk_Lense_L,
        customok_kcode_l: req.body.customOk_Kcode_L,
        customok_power_l: req.body.customOk_Power_L,
        customok_size_l: req.body.customOk_Size_L,
        type: req.body.type,
      });
    }
    if (type == CONSTANT.CustomerOk.SOFT) {
      customerOk = await CustomerOk.create({
        doctor_code: req.body.mabacsi,
        doctor_id: req.body.idbacsi,
        customer_id: req.body.khid,
        dttc_id: req.body.iddttc,
        date_examination: req.body.ngaykham,

        ref_sph_r: req.body.SPH_R,
        ref_cyl_r: req.body.CYL_R,
        d_k1_r: req.body.HK_R, // HK
        d_k2_r: req.body.VK_R, // VK
        customok_power_r: req.body.Power_R,

        ref_sph_l: req.body.SPH_L,
        ref_cyl_l: req.body.CYL_L,
        d_k1_l: req.body.HK_L, //HK
        d_k2_l: req.body.VK_L, //VK

        customok_power_l: req.body.Power_L,
        type: req.body.type,
      });
    }

    if (customerOk) {
      return res.send({
        status: "success",
        message: "",
        data: "",
      });
    }
    res.send({ code: 400, msg: "error" });
  }
);

module.exports = router;
