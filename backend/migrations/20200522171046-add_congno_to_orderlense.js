"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.addColumn("Lenses", "paid", Sequelize.DOUBLE),
      queryInterface.addColumn("Lenses", "glass_money", Sequelize.DOUBLE),
      queryInterface.addColumn("Lenses", "amount", Sequelize.DOUBLE),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.removeColumn("Lenses", "paid"),
      queryInterface.removeColumn("Lenses", "glass_money"),
      queryInterface.removeColumn("Lenses", "amount"),
    ]);
  },
};
