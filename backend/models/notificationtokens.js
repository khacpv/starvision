'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tokens = sequelize.define('NotificationTokens', {
    token: DataTypes.TEXT,
    expired: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {});
  Tokens.associate = function(models) {
    // associations can be defined here
  };
  return Tokens;
};