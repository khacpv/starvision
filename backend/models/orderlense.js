'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderLense = sequelize.define('OrderLense', {
    doctor_code: DataTypes.STRING,
    doctor_id: DataTypes.STRING,
    customer_id: DataTypes.STRING,
    dttc_id: DataTypes.STRING,
    date_examination: DataTypes.STRING,
    id_lense_left: DataTypes.INTEGER,
    id_lense_right: DataTypes.INTEGER,
    order_number: DataTypes.STRING,
    is_active: DataTypes.INTEGER,
    note: DataTypes.TEXT
  }, {});
  OrderLense.associate = function(models) {
    // associations can be defined here
    OrderLense.belongsTo(models.Lense, { as: 'left', foreignKey: 'id_lense_left' });
    OrderLense.belongsTo(models.Lense, { as: 'right', foreignKey: 'id_lense_right' });
  };
  return OrderLense;
};