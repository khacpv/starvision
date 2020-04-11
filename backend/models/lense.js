'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lense = sequelize.define('Lense', {
    lense: DataTypes.STRING,
    kcode: DataTypes.STRING,
    power: DataTypes.STRING,
    side: DataTypes.STRING,
    note: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
    status: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {});
  Lense.associate = function(models) {
    // associations can be defined here
  };
  return Lense;
};