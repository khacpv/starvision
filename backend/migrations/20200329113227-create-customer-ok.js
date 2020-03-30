'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CustomerOks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctor_code: {
        type: Sequelize.STRING
      },
      doctor_id: {
        type: Sequelize.STRING
      },
      customer_id: {
        type: Sequelize.STRING
      },
      dttc_id: {
        type: Sequelize.STRING
      },
      date_examination: {
        type: Sequelize.STRING
      },
      ref_sph_r: {
        type: Sequelize.DOUBLE
      },
      ref_cyl_r: {
        type: Sequelize.DOUBLE
      },
      ref_ax_r: {
        type: Sequelize.DOUBLE
      },
      bcva_va_r: {
        type: Sequelize.STRING
      },
      bcva_sph_r: {
        type: Sequelize.DOUBLE
      },
      bcva_cyl_r: {
        type: Sequelize.DOUBLE
      },
      bcva_ax_r: {
        type: Sequelize.DOUBLE
      },
      d_k1_r: {
        type: Sequelize.DOUBLE
      },
      d_k2_r: {
        type: Sequelize.DOUBLE
      },
      d_ave_r: {
        type: Sequelize.DOUBLE
      },
      d_hvid_r: {
        type: Sequelize.DOUBLE
      },
      customok_lense_r: {
        type: Sequelize.STRING
      },
      customok_kcode_r: {
        type: Sequelize.STRING
      },
      customok_power_r: {
        type: Sequelize.STRING
      },
      customok_size_r: {
        type: Sequelize.STRING
      },
      ref_sph_l: {
        type: Sequelize.DOUBLE
      },
      ref_cyl_l: {
        type: Sequelize.DOUBLE
      },
      ref_ax_l: {
        type: Sequelize.DOUBLE
      },
      bcva_va_l: {
        type: Sequelize.STRING
      },
      bcva_sph_l: {
        type: Sequelize.DOUBLE
      },
      bcva_cyl_l: {
        type: Sequelize.DOUBLE
      },
      bcva_ax_l: {
        type: Sequelize.DOUBLE
      },
      d_k1_l: {
        type: Sequelize.DOUBLE
      },
      d_k2_l: {
        type: Sequelize.DOUBLE
      },
      d_ave_l: {
        type: Sequelize.DOUBLE
      },
      d_hvid_l: {
        type: Sequelize.DOUBLE
      },
      customok_lense_l: {
        type: Sequelize.STRING
      },
      customok_kcode_l: {
        type: Sequelize.STRING
      },
      customok_power_l: {
        type: Sequelize.STRING
      },
      customok_size_l: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CustomerOks');
  }
};