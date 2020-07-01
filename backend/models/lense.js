'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lense = sequelize.define('Lense', {
    lense: DataTypes.STRING,
    kcode: DataTypes.STRING,
    power: DataTypes.STRING,
    side: DataTypes.STRING,
    size: DataTypes.STRING,
    note: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
    status: DataTypes.INTEGER,
    type: DataTypes.STRING,
    prefix: DataTypes.STRING,
    paid: DataTypes.DOUBLE,
    glass_money: DataTypes.DOUBLE,
    amount: DataTypes.DOUBLE
  }, {});
  Lense.associate = function(models) {
    // associations can be defined here
  };
  return Lense;
};