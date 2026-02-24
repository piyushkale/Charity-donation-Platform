const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const charityModel = sequelize.define("charities", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  mission: { type: DataTypes.TEXT, allowNull: false },
  goal_amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  collected_amount: { type: DataTypes.INTEGER },
  status: {
    type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
    allowNull: false,
    defaultValue: "PENDING",
  },
});

module.exports = charityModel;
