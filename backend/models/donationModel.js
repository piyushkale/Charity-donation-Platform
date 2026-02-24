const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const donationModel = sequelize.define("donations", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  order_id: { type: DataTypes.STRING, allowNull: false, unique: true },
  payment_id: { type: DataTypes.STRING, unique: true },
  status: {
    type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED"),
    defaultValue: "PENDING",
  },
});

module.exports = donationModel;
