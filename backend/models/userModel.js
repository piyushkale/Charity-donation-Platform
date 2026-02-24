const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

// 3 roles - USER, CHARIY, ADMIN
const userModel = sequelize.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  phone: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM("USER", "CHARITY", "ADMIN"),
    allowNull: false,
    defaultValue: "USER",
  },
});

module.exports = userModel;
