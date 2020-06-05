'use strict';
module.exports = (sequelize, DataTypes) => {
  const CustomerCheck = sequelize.define('CustomerCheck', {
    doctor_code: DataTypes.STRING,
    doctor_id: DataTypes.STRING,
    customer_id: DataTypes.STRING,
    dttc_id: DataTypes.STRING,
    date_examination: DataTypes.STRING,
    id_left: DataTypes.INTEGER,
    id_right: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {});
  CustomerCheck.associate = function(models) {
    // associations can be defined here
    CustomerCheck.belongsTo(models.CustomerOk, { as: 'left', foreignKey: 'id_left' });
    CustomerCheck.belongsTo(models.CustomerOk, { as: 'right', foreignKey: 'id_right' });
    CustomerCheck.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customer_id' });
  };
  return CustomerCheck;
};