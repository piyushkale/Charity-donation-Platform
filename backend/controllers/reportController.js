const charityModel = require("../models/charityModel");
const sendError = require("../services/handleError");

const createImpactReport = async (req, res) => {
  try {
    const { userId, role } = req.user;
    if (role !== "CHARITY") {
      return sendError(res, null, 403, "Only charity accounts allowed");
    }
    const { charityId } = req.params;
    const { title, description } = req.body;
    const charity = await charityModel.findByPk(Number(charityId));
    if (!charity) {
      return sendError(res, null, 404, "Charity not found");
    }
    if (!title || !description) {
      return sendError(res, null, 400, "Missing required input!");
    }
    if (charity.userId !== userId) {
      return sendError(res, null, 403, "Forbidden");
    }
    const iReport = await charity.createImpactReport({ title, description });
    res.status(201).json({ message: "Impact report added", data: iReport });
  } catch (error) {
    return sendError(res, error, 500);
  }
};

const getImpactReport = async (req, res) => {
  try {
    const { charityId } = req.params;
    if (!charityId) {
      return sendError(res, null, 400, "Bad request");
    }
    const charity = await charityModel.findByPk(Number(charityId)); 
    if (!charity) {
      return sendError(res, null, 404, "Charity not found!");
    }
    const iReports = await charity.getImpactReports();
    res.status(200).json({iReports,charity});
  } catch (error) {
    return sendError(res, error, 500);
  }
};

module.exports = { createImpactReport, getImpactReport };
