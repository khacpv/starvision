"use strict";
var faker = require('faker/locale/vi');
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
    let array = [];
    for (let i = 0; i < 1000; i++) {
      array.push({
        customer_code: faker.random.number(100),
        customer_name: faker.name.findName(),
        mobile: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        birthday: faker.date.recent(),
        doctor_name: faker.name.findName(),
        doctor_id:faker.random.number(100),
        dttc_name:faker.name.findName(),
        dttc_id: faker.random.number(100)
      });
    }

    return queryInterface.bulkInsert('Customers', array, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Customer', null, {});

  },
};
