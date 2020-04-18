const express = require("express");
const router = express.Router();
const models = require("../models/index");
const CustomerOk = models.CustomerOk;
const { check, validationResult } = require("express-validator");

// router.get("/", async (req, res) => {
//   let customers = await CustomerOk.findAll({});
//   let result = [];
//   if (customers) {
//     customers.forEach(data => {
//       result.push({
//         customOk: {
//           customOk_R: {
//             od_refactometer_sph: data.ref_sph_r,
//             od_refactometer_cyl: data.ref_cyl_r,
//             od_refactometer_ax: data.ref_ax_r,
//             od_bcva_va: data.bcva_va_r,
//             od_bcva_sph: data.bcva_sph_r,
//             od_bcva_cyl: data.bcva_cyl_r,
//             od_bcva_ax: data.bcva_ax_r,
//             od_original_k1: data.d_k1_r,
//             od_original_k2: data.d_k2_r,
//             od_original_ave: data.d_ave_r,
//             od_original_hvid: data.d_hvid_r,
//             od_custom_ok_lense: data.customok_lense_r,
//             od_custom_ok_k_code: data.customok_kcode_r,
//             od_custom_ok_power: data.customok_power_r,
//             od_custom_ok_size: data.customok_size_r,
//             ngayfitting: data.createAt
//           },
//           customOk_L: {
//             od_refactometer_sph: data.ref_sph_l,
//             od_refactometer_cyl: data.ref_cyl_l,
//             od_refactometer_ax: data.ref_ax_l,

//             od_bcva_va: data.bcva_va_l,
//             od_bcva_sph: data.bcva_sph_l,
//             od_bcva_cyl: data.bcva_cyl_l,
//             od_bcva_ax: data.bcva_ax_l,
//             od_original_k1: data.d_k1_l,
//             od_original_k2: data.d_k2_l,
//             od_original_ave: data.d_ave_l,
//             od_original_hvid: data.d_hvid_l,
//             od_custom_ok_lense: data.customok_lense_l,
//             od_custom_ok_k_code: data.customok_kcode_l,
//             od_custom_ok_power: data.customok_power_l,
//             od_custom_ok_size: data.customok_size_l,
//             ngayfitting: data.createAt
//           }
//         }
//       });
//     });
//     res.send({
//       status: "success",
//       message: "",
//       data: result
//     });
//   }
//   res.send({
//     status: "error",
//     message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
//     data: ""
//   });
// });

router.get("/", async (req, res) => {
  let customerId = req.query.khid;
  let dttcId = req.query.iddttc;

  let data = await CustomerOk.findOne({
    where: {
      customer_id: customerId,
      dttc_id: dttcId,
    },
  });

  if (data) {
    let result = {
      customOk: {
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

    return res.send({
      status: "success",
      message: "",
      data: result,
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
    let checkCustomerOk = await CustomerOk.findOne({
      where: {
        customer_id: req.body.khid,
        dttc_id: req.body.iddttc,
      },
    });
    if (checkCustomerOk) {
      let updateCustomer = await CustomerOk.update(
        {
          doctor_code: req.body.mabacsi,
          doctor_id: req.body.idbacsi,
          // customer_id: req.body.khid,
          // dttc_id: req.body.iddttc,
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
            id: checkCustomerOk.id
          },
        }
      );

      if (updateCustomer) {
        return res.send({
          status: "success",
          message: "",
          data: "",
        });
      }
    }

    let customerOk = await CustomerOk.create({
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
    });

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

router.put("/:id", (req, res) => {
  CustomerOk.update(
    {
      mabacsi: req.body.mabacsi,
      idbacsi: req.body.idbacsi,
      khid: req.body.khid,
      iddttc: req.body.iddttc,
      ngaykham: req.body.ngaykham,
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
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      res.send({ code: 200, msg: "success", items: data });
    })
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  CustomerOk.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      res.send({ code: 200, msg: "success" });
    })
    .catch((err) => res.json(err));
});

module.exports = router;
