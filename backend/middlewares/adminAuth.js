const jwt = require("jsonwebtoken");
const sendError = require("../services/handleError");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return sendError(res, null, 401, "Token missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== "ADMIN") {
      return sendError(res, null, 403, "Forbidden");
    }
    req.user = decoded;
    next();
  } catch (error) {
    return sendError(res, null, 401, "Invalid or expired token");
  }
};
