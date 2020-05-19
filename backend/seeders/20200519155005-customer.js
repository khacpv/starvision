"use strict";
const fs = require("fs");
var path = require("path");
var appDir = path.dirname(__filename);

module.exports = {
  up: (queryInterface, Sequelize) => {
    let customerList = [];
    try {
      const data = fs.readFileSync(appDir + "/customer.txt", "UTF-8");
      const lines = data.split(/\r?\n/);
      lines.forEach((line, index) => {
        let spl = line.split("\t");
        let id = spl[0];
        let customer_code = spl[1];
        let customer_name = spl[2];
        let doctor_id = spl[3];
        let doctor_name = spl[4];
        let phone1 = spl[5];
        let phone2 = spl[6];
        let mobile = spl[7];
        let address = spl[11];
        let birthday = spl[12];
        let note = spl[14];
        let data_group = spl[15];
        let dttc_name = spl[16];
        let gender = spl[20];
        let dttc_id = spl[27];
        let customer_type = spl[23];
        let createdAt = spl[32];
        let debt_last_month = spl[36];
        let costs_incurred_this_month = spl[37];
        let paid = spl[13];
        let glass_money = spl[39];
        let vtth_money = spl[38];

        customerList.push({
          id: spl[0],
          customer_code: customer_code,
          customer_name: customer_name,
          phone1: phone1,
          phone2: phone2,
          mobile: mobile,
          address: address,
          birthday: birthday,
          gender: gender,
          note: note,
          doctor_name: doctor_name,
          doctor_id: doctor_id,
          dttc_name: dttc_name,
          dttc_id: dttc_id,
          customer_type: customer_type,
          data_group: data_group,
          createdAt: createdAt,
          updatedAt: new Date(),

          debt_last_month: debt_last_month==null?debt_last_month: null,
          costs_incurred_this_month: costs_incurred_this_month==null?costs_incurred_this_month:null,
          paid: paid == null ?paid:null,
          glass_money: glass_money == null ?glass_money:null,
          vtth_money: vtth_money==null ? vtth_money: null,
        });
      });
    } catch (err) {
      console.error(err);
    }
    return queryInterface.bulkInsert("Customers", customerList, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Customers", null, {});
  },
};
