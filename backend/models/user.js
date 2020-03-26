'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    ID_NGUOIDUNG_NHOM: DataTypes.INTEGER,
    ID_PHONGBAN: DataTypes.INTEGER,
    ID_DTTC: DataTypes.INTEGER,
    TEN_DTTC: DataTypes.STRING,
    EMAIL: DataTypes.STRING,
    FULLNAME: DataTypes.STRING,
    TAIKHOAN: DataTypes.STRING,
    MATKHAU: DataTypes.STRING,
    HOATDONG: DataTypes.INTEGER,
    XUATDULIEU: DataTypes.INTEGER,
    HINHNEN: DataTypes.STRING,
    FONTNAME: DataTypes.STRING,
    FONTSIZE: DataTypes.FLOAT,
    FORECOLOR: DataTypes.INTEGER,
    BACKCOLOR: DataTypes.INTEGER,
    GHICHU: DataTypes.TEXT,
    QUYEN: DataTypes.INTEGER,
    QUYENDULIEU: DataTypes.STRING,
    HTMLCHUKY: DataTypes.STRING,
    CHUKY: DataTypes.STRING,
    ID_KHO: DataTypes.INTEGER
  }, {
    paranoid: true
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};