const donationModel = require("../models/donationModel");
const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const charityModel = require("../models/charityModel");
const sendError = require("../services/handleError");
const sequelize = require("../utils/db-connection");
const createOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { amount, charityId } = req.body;
    if (!amount || amount <= 0 || !charityId) {
      return sendError(res, null, 400, "Invalid donation data");
    }
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    await donationModel.create({
      amount,
      order_id: order.id,
      userId,
      charityId,
      currency: "INR",
    });

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    return sendError(res, error, 500);
  }
};

const verifyPayment = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      charityId,
      amount,
    } = req.body;

    // Basic validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return sendError(res, null, 400, "Missing payment details");
    }
    const donation = await donationModel.findOne({
      where: { order_id: razorpay_order_id },
    });

    if (!donation) {
      return sendError(res, null, 404, "Donation not found");
    }

    if (donation.status === "SUCCESS") {
      return res.status(200).json({ message: "Already verified" });
    }
    // Generate expected signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    // Compare signatures
    if (expectedSignature !== razorpay_signature) {
      // Optionally update status to FAILED
      donation.status = "FAILED";
      await donation.save();
      return sendError(res, null, 400, "Invalid signature");
    }

    // Update donation as SUCCESS
    donation.status = "SUCCESS";
    donation.payment_id = razorpay_payment_id;
    await donation.save({ transaction: t });

    const charity = await charityModel.findByPk(donation.charityId, {
      transaction: t,
    });
    charity.collected_amount += Number(amount);
    await charity.save({ transaction: t });
    await t.commit();
    return res.status(200).json({
      message: "Payment verified successfully",
    });
  } catch (error) {
    await t.rollback();
    return sendError(res, error, 500);
  }
};
const getMyDonations = async (req, res) => {
  try {
    const { userId } = req.user;

    const data = await donationModel.findAll({
      where: { userId },
      include: [
        {
          model: charityModel,
          as: "charity",
          attributes: ["name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ donations: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch donations" });
  }
};

module.exports = { createOrder, verifyPayment, getMyDonations };
