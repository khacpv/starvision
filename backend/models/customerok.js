'use strict';
module.exports = (sequelize, DataTypes) => {
  const CustomerOk = sequelize.define('CustomerOk', {
    mabacsi: DataTypes.STRING,
    idbacsi: DataTypes.STRING,
    khid: DataTypes.STRING,
    iddttc: DataTypes.STRING,
    ngaykham: DataTypes.STRING,
    Ref_SPH_R: DataTypes.DOUBLE,
    Ref_CYL_R: DataTypes.DOUBLE,
    Ref_AX_R: DataTypes.DOUBLE,
    BCVA_VA_R: DataTypes.STRING,
    BCVA_SPH_R: DataTypes.DOUBLE,
    BCVA_CYL_R: DataTypes.DOUBLE,
    BCVA_AX_R: DataTypes.DOUBLE,
    D_K1_R: DataTypes.DOUBLE,
    D_K2_R: DataTypes.DOUBLE,
    D_AVE_R: DataTypes.DOUBLE,
    D_HVID_R: DataTypes.DOUBLE,
    customOk_Lense_R: DataTypes.STRING,
    customOk_Kcode_R: DataTypes.STRING,
    customOk_Power_R: DataTypes.STRING,
    customOk_Size_R: DataTypes.STRING,
    Ref_SPH_L: DataTypes.DOUBLE,
    Ref_CYL_L: DataTypes.DOUBLE,
    Ref_AX_L: DataTypes.DOUBLE,
    BCVA_VA_L: DataTypes.STRING,
    BCVA_SPH_L: DataTypes.DOUBLE,
    BCVA_CYL_L: DataTypes.DOUBLE,
    BCVA_AX_L: DataTypes.DOUBLE,
    D_K1_L: DataTypes.DOUBLE,
    D_K2_L: DataTypes.DOUBLE,
    D_AVE_L: DataTypes.DOUBLE,
    D_HVID_L: DataTypes.DOUBLE,
    customOk_Lense_L: DataTypes.STRING,
    customOk_Kcode_L: DataTypes.STRING,
    customOk_Power_L: DataTypes.STRING,
    customOk_Size_L: DataTypes.STRING
  }, {});
  CustomerOk.associate = function(models) {
    // associations can be defined here
  };
  return CustomerOk;
};