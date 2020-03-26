'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MAKH: {
        type: Sequelize.STRING
      },
      TENKHACHHANG: {
        type: Sequelize.STRING
      },
      MABS: {
        type: Sequelize.STRING
      },
      TENBS: {
        type: Sequelize.STRING
      },
      DIENTHOAI1: {
        type: Sequelize.STRING
      },
      DIENTHOAI2: {
        type: Sequelize.STRING
      },
      DIDONG: {
        type: Sequelize.STRING
      },
      FAX: {
        type: Sequelize.STRING
      },
      EMAIL: {
        type: Sequelize.STRING
      },
      WEBSITE: {
        type: Sequelize.STRING
      },
      DIACHI: {
        type: Sequelize.STRING
      },
      NGAYSINH: {
        type: Sequelize.DATE
      },
      SOTAIKHOAN: {
        type: Sequelize.TEXT
      },
      GHICHUHOSOKHACHHANG: {
        type: Sequelize.TEXT
      },
      DULIEUNHOM: {
        type: Sequelize.INTEGER
      },
      NGUOIQUANLY: {
        type: Sequelize.STRING
      },
      ID_TINHTHANHPHO: {
        type: Sequelize.INTEGER
      },
      ID_QUANHUYEN: {
        type: Sequelize.INTEGER
      },
      ID_NHOMLINHVUC: {
        type: Sequelize.INTEGER
      },
      GIOITINH: {
        type: Sequelize.INTEGER
      },
      ID_LOAIHINH: {
        type: Sequelize.INTEGER
      },
      ID_LOAIKHACHHANG: {
        type: Sequelize.INTEGER
      },
      ID_LOAIHOSOKH: {
        type: Sequelize.INTEGER
      },
      ID_PHANNHOM1: {
        type: Sequelize.INTEGER
      },
      ID_PHANNHOM2: {
        type: Sequelize.INTEGER
      },
      ID_NGANHANG: {
        type: Sequelize.INTEGER
      },
      ID_DTTC: {
        type: Sequelize.INTEGER
      },
      J_KHACHHANGCHINHANH: {
        type: Sequelize.INTEGER
      },
      SINHNHAT: {
        type: Sequelize.INTEGER
      },
      NGUOIDUNG1: {
        type: Sequelize.INTEGER
      },
      MAY1: {
        type: Sequelize.STRING
      },
      NGAY1: {
        type: Sequelize.DATE
      },
      J_KHACHHANGGIOITHIEU: {
        type: Sequelize.INTEGER
      },
      J_DTDTCGIOITHIEU: {
        type: Sequelize.INTEGER
      },
      QUYENDULIEU: {
        type: Sequelize.STRING
      },
      TONGNHANVIEN: {
        type: Sequelize.STRING
      },
      SOCHINHANH: {
        type: Sequelize.STRING
      },
      VONPHAPDINH: {
        type: Sequelize.STRING
      },
      MASOTHUE: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Customers');
  }
};