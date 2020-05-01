'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tokens = sequelize.define('Tokens', {
    access_token: DataTypes.TEXT,
    refresh_token: DataTypes.TEXT,
    expired: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {});
  Tokens.associate = function(models) {
    // associations can be defined here
  };
  return Tokens;
};