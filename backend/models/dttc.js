'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dttc = sequelize.define('Dttc', {
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
  Dttc.associate = function(models) {
    // associations can be defined here
  };
  return Dttc;
};