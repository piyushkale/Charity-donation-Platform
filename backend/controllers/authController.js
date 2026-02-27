const userModel = require("../models/userModel");
const sendError = require("../services/handleError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password) {
      return sendError(res, null, 400, "Invalid input");
    }
    const allowedRoles = ["USER", "CHARITY"];
    const finalRole = allowedRoles.includes(role) ? role : "USER";
    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userModel.create({
      name,
      email,
      phone,
      password: hashPassword,
      role: finalRole,
    });
    res.status(201).json({ message: `Profile created, ${user.name}` });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return sendError(
        res,
        error,
        400,
        "Account already exist for this email/phone",
      );
    }
    sendError(res, error, 500);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendError(res, null, 400, "Email and password required");
    }
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      return sendError(res, null, 400, "Account does not exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(res, null, 400, "Invalid email or password");
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    sendError(res, error, 500);
  }
};

const userProfile = async (req, res) => {
  try {
    const { userId, name, role } = req.user;
    if (!userId || !name || !role) {
      return sendError(res, null, 403, "Access denied");
    }
    res.status(200).json({ name, role, userId });
  } catch (error) {
    return sendError(res, error, 500);
  }
};
module.exports = { registerUser, loginUser, userProfile };
