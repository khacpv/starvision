module.exports = async (data)=> {  
  return {
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
        ngayfitting: data.createAt
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
        ngayfitting: data.createAt
      }
    }
  };
};
