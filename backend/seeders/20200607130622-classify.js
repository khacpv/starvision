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
        console.log(spl[10] + "-" + spl[11]);

        if (fitting_type.includes(Number(spl[9]))) {
          fs.appendFileSync(appDir + "/fitting.txt", dubao + "\r\n");
        }
      });
    } catch (err) {
      console.error(err);
    }
    return true;
    // return queryInterface.bulkInsert("Customers", customerList, {});
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
