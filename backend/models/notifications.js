'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    sender_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER,
    is_read: DataTypes.INTEGER,
    send_at: DataTypes.DATE
  }, {});
  Notifications.associate = function(models) {
    // associations can be defined here
    Notifications.belongsTo(models.Doctors, { as: 'user', foreignKey: 'receiver_id' , targetKey: 'user_id'});
  };
  return Notifications;
};