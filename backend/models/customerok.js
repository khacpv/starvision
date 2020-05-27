'use strict';
module.exports = (sequelize, DataTypes) => {
  const CustomerOk = sequelize.define('CustomerOk', {
    doctor_code: DataTypes.STRING,
    doctor_id: DataTypes.STRING,
    customer_id: DataTypes.STRING,
    dttc_id: DataTypes.STRING,
    date_examination: DataTypes.STRING,
    ref_sph_r: DataTypes.STRING,
    ref_cyl_r: DataTypes.STRING,
    ref_ax_r: DataTypes.STRING,
    bcva_va_r: DataTypes.STRING,
    bcva_sph_r: DataTypes.STRING,
    bcva_cyl_r: DataTypes.STRING,
    bcva_ax_r: DataTypes.STRING,
    d_k1_r: DataTypes.STRING,
    d_k2_r: DataTypes.STRING,
    d_ave_r: DataTypes.STRING,
    d_hvid_r: DataTypes.STRING,
    customok_lense_r: DataTypes.STRING,
    customok_kcode_r: DataTypes.STRING,
    customok_power_r: DataTypes.STRING,
    customok_size_r: DataTypes.STRING,
    ref_sph_l: DataTypes.STRING,
    ref_cyl_l: DataTypes.STRING,
    ref_ax_l: DataTypes.STRING,
    bcva_va_l: DataTypes.STRING,
    bcva_sph_l: DataTypes.STRING,
    bcva_cyl_l: DataTypes.STRING,
    bcva_ax_l: DataTypes.STRING,
    d_k1_l: DataTypes.STRING,
    d_k2_l: DataTypes.STRING,
    d_ave_l: DataTypes.STRING,
    d_hvid_l: DataTypes.STRING,
    customok_lense_l: DataTypes.STRING,
    customok_kcode_l: DataTypes.STRING,
    customok_power_l: DataTypes.STRING,
    customok_size_l: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  CustomerOk.associate = function(models) {
    // associations can be defined here
    CustomerOk.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customer_id' });

  };
  return CustomerOk;
};