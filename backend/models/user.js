"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      code: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      mobile: DataTypes.STRING,
      address: DataTypes.STRING,
      birthday: DataTypes.STRING,
      gender: DataTypes.INTEGER,
      note: DataTypes.TEXT
    },
    { 
      paranoid: true 
    }
  );
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Role, { through: "UserRole", foreignKey: "userId" });

  };
  return User;
};
