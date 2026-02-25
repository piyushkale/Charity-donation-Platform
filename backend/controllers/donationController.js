const donationModel = require("../models/donationModel");
const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const sendError = require("../services/handleError");

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
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

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
    await donation.save();

    return res.status(200).json({
      message: "Payment verified successfully",
    });
  } catch (error) {
    return sendError(res, error, 500);
  }
};

module.exports = { createOrder, verifyPayment };
