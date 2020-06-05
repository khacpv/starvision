'use strict';
module.exports = (sequelize, DataTypes) => {
  const FollowUpCheck = sequelize.define('FollowUpCheck', {
    doctor_code: DataTypes.STRING,
    doctor_id: DataTypes.STRING,
    customer_id: DataTypes.STRING,
    dttc_id: DataTypes.STRING,
    date_examination: DataTypes.STRING,
    re_examination_date: DataTypes.STRING,
    id_left: DataTypes.INTEGER,
    id_right: DataTypes.INTEGER
  }, {});
  FollowUpCheck.associate = function(models) {
    // associations can be defined here
    FollowUpCheck.belongsTo(models.FollowUp, { as: 'left', foreignKey: 'id_left' });
    FollowUpCheck.belongsTo(models.FollowUp, { as: 'right', foreignKey: 'id_right' });
  };
  return FollowUpCheck;
};