'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fitting = sequelize.define('Fitting', {
    doctor_code: DataTypes.STRING,
    doctor_id: DataTypes.STRING,
    customer_id: DataTypes.STRING,
    dttc_id: DataTypes.STRING,
    date_examination: DataTypes.STRING,
    fitting_no: DataTypes.STRING,

    referaction_sph: DataTypes.STRING,
    referaction_cyl: DataTypes.STRING,
    referaction_ax: DataTypes.STRING,

    bcva_va: DataTypes.STRING,
    bcva_sph: DataTypes.STRING,
    bcva_cyl: DataTypes.STRING,
    bcva_ax: DataTypes.STRING,
    
    side: DataTypes.STRING,
    kcode: DataTypes.STRING,
    power: DataTypes.STRING,
    size: DataTypes.STRING,

    comment_size: DataTypes.STRING,
    comment_matbo: DataTypes.STRING,
    comment_vung_dieu_tri: DataTypes.STRING,
    comment_di_chuyen: DataTypes.STRING,
    comment_ket_luan: DataTypes.STRING,
    video: DataTypes.STRING,
    thumb: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Fitting.associate = function(models) {
    // associations can be defined here
    Fitting.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customer_id' });

  };
  return Fitting;
};