const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const impactReportModel = sequelize.define("impactReports", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
});

module.exports = impactReportModel;
