'use strict';
var faker = require('faker');

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
      doctor_code:  faker.lorem.word(),
      doctor_id:  faker.random.number(100),
      customer_id:  faker.random.number(100),
      dttc_id:  faker.random.number(100),
      date_examination: faker.date.recent(),
      fitting_no: faker.random.number(100),
      referaction_sph: faker.random.number(100),
      referaction_cyl: faker.random.number(100),
      referaction_ax: faker.random.number(100),
      bcva_va: faker.lorem.word(),
      bcva_sph: faker.random.number(100),
      bcva_cyl: faker.random.number(100),
      bcva_ax: faker.random.number(100),
      side: faker.lorem.word(),
      kcode: faker.lorem.word(),
      power: faker.lorem.word(),
      comment_size: faker.lorem.word(),
      comment_matbo: faker.lorem.word(),
      comment_vung_dieu_tri: faker.lorem.word(),
      comment_di_chuyen: faker.lorem.word(),
      comment_ket_luan: faker.lorem.word(),
      video: faker.lorem.word(),
      thumb: faker.lorem.word(),
      type: faker.lorem.word()
     });
   }

   return queryInterface.bulkInsert('Fittings', array, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Fittings', null, {});

  }
};
