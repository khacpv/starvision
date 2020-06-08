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
      queryInterface.addColumn("Fittings", "contract_code", Sequelize.STRING),
      queryInterface.addColumn(
        "customeroks",
        "contract_code",
        Sequelize.STRING
      ),
      queryInterface.addColumn("Lenses", "contract_code", Sequelize.STRING),
      queryInterface.addColumn("Followups", "contract_code", Sequelize.STRING),
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
      queryInterface.removeColumn("Fittings", "contract_code", Sequelize.STRING),
      queryInterface.removeColumn(
        "customeroks",
        "contract_code",
        Sequelize.STRING
      ),
      queryInterface.removeColumn("Lenses", "contract_code", Sequelize.STRING),
      queryInterface.removeColumn("Followups", "contract_code", Sequelize.STRING),
    ]);
  },
};
