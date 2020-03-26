'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    MAKH: DataTypes.STRING,
    TENKHACHHANG: DataTypes.STRING,
    MABS: DataTypes.STRING,
    TENBS: DataTypes.STRING,
    DIENTHOAI1: DataTypes.STRING,
    DIENTHOAI2: DataTypes.STRING,
    DIDONG: DataTypes.STRING,
    FAX: DataTypes.STRING,
    EMAIL: DataTypes.STRING,
    WEBSITE: DataTypes.STRING,
    DIACHI: DataTypes.STRING,
    NGAYSINH: DataTypes.DATE,
    SOTAIKHOAN: DataTypes.TEXT,
    GHICHUHOSOKHACHHANG: DataTypes.TEXT,
    DULIEUNHOM: DataTypes.INTEGER,
    NGUOIQUANLY: DataTypes.STRING,
    ID_TINHTHANHPHO: DataTypes.INTEGER,
    ID_QUANHUYEN: DataTypes.INTEGER,
    ID_NHOMLINHVUC: DataTypes.INTEGER,
    GIOITINH: DataTypes.INTEGER,
    ID_LOAIHINH: DataTypes.INTEGER,
    ID_LOAIKHACHHANG: DataTypes.INTEGER,
    ID_LOAIHOSOKH: DataTypes.INTEGER,
    ID_PHANNHOM1: DataTypes.INTEGER,
    ID_PHANNHOM2: DataTypes.INTEGER,
    ID_NGANHANG: DataTypes.INTEGER,
    ID_DTTC: DataTypes.INTEGER,
    J_KHACHHANGCHINHANH: DataTypes.INTEGER,
    SINHNHAT: DataTypes.INTEGER,
    NGUOIDUNG1: DataTypes.INTEGER,
    MAY1: DataTypes.STRING,
    NGAY1: DataTypes.DATE,
    J_KHACHHANGGIOITHIEU: DataTypes.INTEGER,
    J_DTDTCGIOITHIEU: DataTypes.INTEGER,
    QUYENDULIEU: DataTypes.STRING,
    TONGNHANVIEN: DataTypes.STRING,
    SOCHINHANH: DataTypes.STRING,
    VONPHAPDINH: DataTypes.STRING,
    MASOTHUE: DataTypes.STRING
  }, {
    paranoid: true
  });
  Customer.associate = function(models) {
    // associations can be defined here
  };
  return Customer;
};