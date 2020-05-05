'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customer_code: DataTypes.STRING,
    customer_name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    address: DataTypes.STRING,
    birthday: DataTypes.STRING,
    gender: DataTypes.STRING,
    note: DataTypes.TEXT,
    doctor_name: DataTypes.STRING,
    doctor_id: DataTypes.STRING,
    dttc_name: DataTypes.STRING,
    dttc_id: DataTypes.STRING,
    customer_type: DataTypes.INTEGER,
    data_group: DataTypes.INTEGER,
    debt_last_month: DataTypes.DOUBLE,
    costs_incurred_this_month: DataTypes.DOUBLE,
    paid: DataTypes.DOUBLE,
    glass_money: DataTypes.DOUBLE,
    vtth_money: DataTypes.DOUBLE,

  }, {
    paranoid: true
  });
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.belongsTo(models.Dttc, { as: 'dttc', foreignKey: 'dttc_id' });

  };
  return Customer;
};