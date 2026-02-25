const charityModel = require("../models/charityModel");
const sendError = require("../services/handleError");

const createCharity = async (req, res) => {
  try {
    const { userId, role } = req.user;
    if (!userId || role !== "CHARITY") {
      return sendError(res, null, 403, "Access denied");
    }
    const { name, description, mission, goal_amount } = req.body;
    if (!name || typeof goal_amount !== "number" || goal_amount <= 0) {
      return sendError(res, null, 400, "Name and goal amount are required");
    }
    const charityNew = await charityModel.create({
      name,
      description,
      mission,
      goal_amount,
      userId,
    });
    res.status(201).json({
      message: "Charity created successfully",
      data: charityNew,
    });
  } catch (error) {
    return sendError(res, error, 500);
  }
};

const getAllCharities = async (req, res) => {
  try {
    const data = await charityModel.findAll({ where: { status: "APPROVED" } });
    res.status(200).json({ data });
  } catch (error) {
    return sendError(res, error, 500);
  }
};

const ownedCharities = async (req, res) => {
  try {
    const { userId, role } = req.user;
    if (!userId || role !== "CHARITY") {
      return sendError(res, null, 403, "Access denied");
    }
    const charities = await charityModel.findAll({ where: { userId } });
    res.status(200).json({ data: charities });
  } catch (error) {
    return sendError(res, error, 500);
  }
};

const deleteCharity = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;
    if (!userId || role !== "CHARITY") {
      return sendError(res, null, 403, "Access denied");
    }
    const charity = await charityModel.findByPk(id);
    if (!charity) {
      return sendError(res, null, 404, "Charity not found");
    }
    if (charity.userId !== userId) {
      return sendError(res, null, 403, "Forbidden");
    }
    await charity.destroy();
    res.status(200).json({ message: "Charity deleted" });
  } catch (error) {
    return sendError(res, error, 500);
  }
};
module.exports = {
  createCharity,
  getAllCharities,
  ownedCharities,
  deleteCharity,
};
