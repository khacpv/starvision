'use strict';
module.exports = (sequelize, DataTypes) => {
  const CustomerOk = sequelize.define('CustomerOk', {
    refactometer_sph: DataTypes.STRING,
    refactometer_cyl: DataTypes.STRING,
    refactometer_ax: DataTypes.STRING,
    bcva_va: DataTypes.STRING,
    bcva_sph: DataTypes.STRING,
    bcva_cyl: DataTypes.STRING,
    bcva_ax: DataTypes.STRING,
    original_k1: DataTypes.STRING,
    original_k2: DataTypes.STRING,
    original_ave: DataTypes.STRING,
    original_hvid: DataTypes.STRING,
    lense: DataTypes.STRING,
    k_code: DataTypes.STRING,
    power: DataTypes.STRING,
    size: DataTypes.STRING,
    contract_code: DataTypes.STRING
  }, {});
  CustomerOk.associate = function(models) {
    // associations can be defined here
  };
  return CustomerOk;
};