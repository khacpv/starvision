"use strict";
const fs = require("fs");
var path = require("path");
var appDir = path.dirname(__filename);

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let fitting_array = [];
    try {
      let du_bao = fs.readFileSync(appDir + "/du_bao.txt", "UTF-8");
      let du_bao_san_pham = fs.readFileSync(
        appDir + "/du_bao_san_pham.txt",
        "UTF-8"
      );
      let fitting_type = [157, 158, 161, 162, 167, 168];
      let data_dubaos = du_bao.split(/\r?\n/);
      let data_du_bao_san_pham = du_bao_san_pham.split(/\r?\n/);

      // data_du_bao_san_pham.forEach((dubaosanpham, index) => {});
      data_dubaos.forEach((dubao, index) => {
        let spl = dubao.split("\t");
        spl.forEach((element, index) => {
          if (element == "NULL") {
            spl[index] = null;
          }
        });
        // console.log(spl[10] + "-" + spl[11]);

        if (fitting_type.includes(Number(spl[9]))) {
          // fs.appendFileSync(appDir + "/fitting.txt", dubao + "\r\n");
          let side = spl[9];
          if (side == 162 || side == 158 || side == 167) {
            side = "R";
          } else {
            side = "L";
          }
          data_du_bao_san_pham.forEach((dubaosanpham, index) => {
            let spl_san_pham = dubaosanpham.split("\t");
            spl_san_pham.forEach((element, index) => {
              if (element == "NULL") {
                spl_san_pham[index] = null;
              }
            });
            if (spl[0] == spl_san_pham[1]) {
              let comment_array =
                spl_san_pham[44] != null ? spl_san_pham[44].split("|") : null;
              fitting_array.push({
                id: spl[0],
                doctor_code: null,
                doctor_id: null,
                customer_id: spl[1],
                dttc_id: spl[2],
                date_examination: spl[31],
                contract_code: spl[5],
                fitting_no: spl_san_pham[53],
                referaction_sph: spl_san_pham[14],
                referaction_cyl: spl_san_pham[15],
                referaction_ax: spl_san_pham[16],
                bcva_va: spl_san_pham[43],
                bcva_sph: spl_san_pham[34],
                bcva_cyl: spl_san_pham[35],
                bcva_ax: spl_san_pham[36],
                kcode: spl_san_pham[5],
                power: spl_san_pham[6],
                size: spl_san_pham[7],
                side: side,
                video: spl_san_pham[45],
                thumb: spl_san_pham[54],
                createdAt: spl[21],
                updatedAt: spl[21],
                comment_size: comment_array[0],
                comment_matbo: comment_array[2],
                comment_vung_dieu_tri: comment_array[1],
                comment_di_chuyen: comment_array[3],
                comment_ket_luan: comment_array[4],
              });
            }
          });
        }
      });
    } catch (err) {
      console.error(err);
    }
    // return true;
    return queryInterface.bulkInsert("Fittings", fitting_array, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
