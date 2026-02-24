const user = require("./userModel");
const charity = require("./charityModel");
const donation = require("./donationModel");
const impactReport = require("./impactReportModel");
// User - Charity
user.hasMany(charity, { foreignKey: "userId", as: "charities" });
charity.belongsTo(user, { foreignKey: "userId", as: "owner" });

// User - Donation
user.hasMany(donation, { foreignKey: "userId", as: "donations" });
donation.belongsTo(user, { foreignKey: "userId", as: "donor" });

// Charity - Donation
charity.hasMany(donation, { foreignKey: "charityId", as: "donations" });
donation.belongsTo(charity, { foreignKey: "charityId", as: "charity" });

// Charity - ImpactReport
charity.hasMany(impactReport, { foreignKey: "charityId", as: "impactReports" });
impactReport.belongsTo(charity, { foreignKey: "charityId", as: "charity" });

module.exports = { user, charity, impactReport, donation };
