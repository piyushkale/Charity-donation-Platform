const charityModel = require("../models/charityModel");
const userModel = require("../models/userModel");
const sendError = require("../services/handleError");

const getCharitiesByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const allowedStatus = ["PENDING", "APPROVED", "REJECTED"];
    if (!allowedStatus.includes(status)) {
      return sendError(res, null, 400, "Invalid status");
    }

    const charities = await charityModel.findAll({
      where: { status },
    });

    return res.status(200).json({ data: charities });
  } catch (error) {
    return sendError(res, error, 500);
  }
};

const charityOrganizations = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "ADMIN") {
      return sendError(res, null, 403, "Forbidden");
    }
    const organizations = await userModel.findAll({
      where: { role: "CHARITY" },
    });
    res.status(200).json({ data: organizations });
  } catch (error) {
    return sendError(res, error, 500);
  }
};

const updateCharityStatus = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "ADMIN") {
      return sendError(res, null, 403, "Forbidden");
    }
    const id = Number(req.params.id);
    const { status } = req.body;
    if (!id || !status || isNaN(id)) {
      return sendError(res, null, 400, "Invalid input");
    }

    const allowedStatus = ["APPROVED", "REJECTED"];
    if (!allowedStatus.includes(status)) {
      return sendError(res, null, 400, "Invalid status value");
    }

    const charity = await charityModel.findByPk(Number(id));

    if (!charity) {
      return sendError(res, null, 404, "Charity not found");
    }
    if (charity.status !== "PENDING") {
      return sendError(res, null, 400, "Charity status already updated");
    }
    charity.status = status;
    await charity.save();

    return res.status(200).json({
      message: "Charity status updated successfully",
      data: charity,
    });
  } catch (error) {
    return sendError(res, error, 500);
  }
};

module.exports = {
  getCharitiesByStatus,
  charityOrganizations,
  updateCharityStatus,
};
