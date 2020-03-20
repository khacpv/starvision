'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {
    paranoid: true
  });
  Role.associate = function(models) {
    // associations can be defined here
    Role.belongsToMany(models.User, { through: "UserRole", foreignKey: "roleId"});
  };
  return Role;
};