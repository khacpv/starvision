'use strict';
module.exports = (sequelize, DataTypes) => {
  const DTTC = sequelize.define('DTTC', {
    TENDTTC: DataTypes.STRING,
    MADTTC: DataTypes.STRING,
    DIACHI: DataTypes.STRING,
    DIDONG: DataTypes.STRING,
    EMAIL: DataTypes.STRING,
    JD_CHUCVU: DataTypes.INTEGER,
    JD_PHONGBAN: DataTypes.INTEGER,
    QUYENNGUOIDUNG: DataTypes.STRING,
    ENABLE_DTTC: DataTypes.INTEGER,
    ID_CHINHANH: DataTypes.INTEGER
  }, {});
  DTTC.associate = function(models) {
    // associations can be defined here
  };
  return DTTC;
};