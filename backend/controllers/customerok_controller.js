const express = require("express");
const router = express.Router();
const models = require("../models/index");
const CustomerOk = models.CustomerOk;
const CustomerCheck = models.CustomerCheck;
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
    let checkCustomerCheck = await CustomerCheck.findOne({
      where: {
        customer_id: req.body.khid,
        dttc_id: req.body.iddttc,
        type: req.body.type,
      },
    });

    let customerOk = null;
    let customerOkLeft = null;
    let customerOkRight = null;

    if (checkCustomerCheck) {
      let updateCustomer = null;
      if (type == CONSTANT.CustomerOk.GOV) {
        customerOkRight = await CustomerOk.update(
          {
            refactometer_sph: req.body.Ref_SPH_R,
            refactometer_cyl: req.body.Ref_CYL_R,
            refactometer_ax: req.body.Ref_AX_R,
            bcva_va: req.body.BCVA_VA_R,
            bcva_sph: req.body.BCVA_SPH_R,
            bcva_cyl: req.body.BCVA_CYL_R,
            bcva_ax: req.body.BCVA_AX_R,
            original_k1: req.body.D_K1_R,
            original_k2: req.body.D_K2_R,
            original_ave: req.body.D_AVE_R,
            original_hvid: req.body.D_HVID_R,
            lense: req.body.customOk_Lense_R,
            k_code: req.body.customOk_Kcode_R,
            power: req.body.customOk_Power_R,
            size: req.body.customOk_Size_R,
          },
          {
            where: {
              id: checkCustomerCheck.id_right,
            },
          }
        );

        customerOkLeft = await CustomerOk.update(
          {
            refactometer_sph: req.body.Ref_SPH_L,
            refactometer_cyl: req.body.Ref_CYL_L,
            refactometer_ax: req.body.Ref_AX_L,
            bcva_va: req.body.BCVA_VA_L,
            bcva_sph: req.body.BCVA_SPH_L,
            bcva_cyl: req.body.BCVA_CYL_L,
            bcva_ax: req.body.BCVA_AX_L,
            original_k1: req.body.D_K1_L,
            original_k2: req.body.D_K2_L,
            original_ave: req.body.D_AVE_L,
            original_hvid: req.body.D_HVID_L,
            lense: req.body.customOk_Lense_L,
            k_code: req.body.customOk_Kcode_L,
            power: req.body.customOk_Power_L,
            size: req.body.customOk_Size_L,
          },
          {
            where: {
              id: checkCustomerCheck.id_left,
            },
          }
        );
      }

      if (type == CONSTANT.CustomerOk.SOFT) {
        customerOkRight = await CustomerOk.update(
          {
            refactometer_sph: req.body.SPH_R,
            refactometer_cyl: req.body.CYL_R,
            original_k1: req.body.HK_R, // HK
            original_k2: req.body.VK_R, // VK
            power: req.body.Power_R,
          },
          {
            where: {
              id: checkCustomerCheck.id_right,
            },
          }
        );

        customerOkLeft = await CustomerOk.update(
          {
            refactometer_sph: req.body.SPH_L,
            refactometer_cyl: req.body.CYL_L,
            original_k1: req.body.HK_L, // HK
            original_k2: req.body.VK_L, // VK
            power: req.body.Power_L,
          },
          {
            where: {
              id: checkCustomerCheck.id_left,
            },
          }
        );
      }

      customerOk = await CustomerCheck.update(
        {
          doctor_code: req.body.mabacsi,
          doctor_id: req.body.idbacsi,
          date_examination: req.body.ngaykham,
          type: req.body.type,
        },
        {
          where: {
            id: checkCustomerCheck.id,
          },
        }
      );

      if (customerOk) {
        return res.send({
          status: "success",
          message: "",
          data: "",
        });
      }
    }

    if (type == CONSTANT.CustomerOk.GOV) {
      if (
        req.body.Ref_SPH_R != null ||
        req.body.Ref_CYL_R != null ||
        req.body.Ref_AX_R != null ||
        req.body.BCVA_VA_R != null ||
        req.body.BCVA_CYL_R != null ||
        req.body.BCVA_SPH_R != null ||
        req.body.BCVA_AX_R != null ||
        req.body.D_K1_R != null ||
        req.body.D_K2_R != null ||
        req.body.D_AVE_R != null ||
        req.body.D_HVID_R != null ||
        req.body.customOk_Lense_R != null ||
        req.body.customOk_Kcode_R != null ||
        req.body.customOk_Power_R != null ||
        req.body.customOk_Size_R != null
      ) {
        customerOkRight = await CustomerOk.create({
          refactometer_sph: req.body.Ref_SPH_R,
          refactometer_cyl: req.body.Ref_CYL_R,
          refactometer_ax: req.body.Ref_AX_R,
          bcva_va: req.body.BCVA_VA_R,
          bcva_sph: req.body.BCVA_SPH_R,
          bcva_cyl: req.body.BCVA_CYL_R,
          bcva_ax: req.body.BCVA_AX_R,
          original_k1: req.body.D_K1_R,
          original_k2: req.body.D_K2_R,
          original_ave: req.body.D_AVE_R,
          original_hvid: req.body.D_HVID_R,
          lense: req.body.customOk_Lense_R,
          k_code: req.body.customOk_Kcode_R,
          power: req.body.customOk_Power_R,
          size: req.body.customOk_Size_R,
        });
      }

      if (
        req.body.Ref_SPH_L != null ||
        req.body.Ref_CYL_L != null ||
        req.body.Ref_AX_L != null ||
        req.body.BCVA_VA_L != null ||
        req.body.BCVA_CYL_L != null ||
        req.body.BCVA_SPH_L != null ||
        req.body.BCVA_AX_L != null ||
        req.body.D_K1_L != null ||
        req.body.D_K2_L != null ||
        req.body.D_AVE_L != null ||
        req.body.D_HVID_L != null ||
        req.body.customOk_Lense_L != null ||
        req.body.customOk_Kcode_L != null ||
        req.body.customOk_Power_L != null ||
        req.body.customOk_Size_L != null
      ) {
        customerOkLeft = await CustomerOk.create({
          refactometer_sph: req.body.Ref_SPH_L,
          refactometer_cyl: req.body.Ref_CYL_L,
          refactometer_ax: req.body.Ref_AX_L,
          bcva_va: req.body.BCVA_VA_L,
          bcva_sph: req.body.BCVA_SPH_L,
          bcva_cyl: req.body.BCVA_CYL_L,
          bcva_ax: req.body.BCVA_AX_L,
          original_k1: req.body.D_K1_L,
          original_k2: req.body.D_K2_L,
          original_ave: req.body.D_AVE_L,
          original_hvid: req.body.D_HVID_L,
          lense: req.body.customOk_Lense_L,
          k_code: req.body.customOk_Kcode_L,
          power: req.body.customOk_Power_L,
          size: req.body.customOk_Size_L,
        });
      }

      customerOk = await CustomerCheck.create({
        doctor_code: req.body.mabacsi,
        doctor_id: req.body.idbacsi,
        customer_id: req.body.khid,
        dttc_id: req.body.iddttc,
        date_examination: req.body.ngaykham,
        id_left: customerOkLeft.id,
        id_right: customerOkRight.id,
        type: req.body.type,
      });
    }
    if (type == CONSTANT.CustomerOk.SOFT) {
      if (
        req.body.SPH_R != null ||
        req.body.CYL_R != null ||
        req.body.HK_R != null ||
        req.body.VK_R != null ||
        req.body.Power_R != null
      ) {
        customerOkRight = await CustomerOk.create({
          refactometer_sph: req.body.SPH_R,
          refactometer_cyl: req.body.CYL_R,
          original_k1: req.body.HK_R, // HK
          original_k2: req.body.VK_R, // VK
          power: req.body.Power_R,
        });
      }

      if (
        req.body.SPH_L != null ||
        req.body.CYL_L != null ||
        req.body.HK_L != null ||
        req.body.VK_L != null ||
        req.body.Power_L != null
      ) {
        customerOkLeft = await CustomerOk.create({
          refactometer_sph: req.body.SPH_L,
          refactometer_cyl: req.body.CYL_L,
          original_k1: req.body.HK_L, // HK
          original_k2: req.body.VK_L, // VK
          power: req.body.Power_L,
        });
      }

      customerOk = await CustomerCheck.create({
        doctor_code: req.body.mabacsi,
        doctor_id: req.body.idbacsi,
        customer_id: req.body.khid,
        dttc_id: req.body.iddttc,
        date_examination: req.body.ngaykham,
        id_left: customerOkLeft.id,
        id_right: customerOkRight.id,
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
