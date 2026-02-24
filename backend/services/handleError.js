const sendError = (res, error, statusCode = 500, message = null) => {
  return res.status(statusCode).json({
    success: false,
    message: message || error?.message || "Internal Server Error"
  });
};

module.exports = sendError;
