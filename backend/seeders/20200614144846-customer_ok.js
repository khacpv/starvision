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
      let fitting_type = [163, 164];
      let data_dubaos = du_bao.split(/\r?\n/);
      let data_du_bao_san_pham = du_bao_san_pham.split(/\r?\n/);

      data_dubaos.forEach((dubao, index) => {
        let spl = dubao.split("\t");
        spl.forEach((element, index) => {
          if (element == "NULL") {
            spl[index] = null;
          }
        });

        if (fitting_type.includes(Number(spl[9]))) {
          fs.appendFileSync(appDir + "/customerok.txt", dubao + "\r\n"); 
        }
      });
    } catch (err) {
      console.error(err);
    }
    return true;
    // return queryInterface.bulkInsert("Customer", fitting_array, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
