const jwt = require("jsonwebtoken");
const { sendEmail } = require("../services/emailService");
const ApiError = require("../utils/errors");
const { successResponse, errorResponse } = require("../utils/response");

// 1️⃣ Generate + Send OTP
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, "Email is required");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Sign OTP with expiry
  const token = jwt.sign({ email, otp }, process.env.JWT_OTP_SECRET, {
    expiresIn: process.env.OTP_EXPIRES || "300s",
  });

  // Send OTP email
  const html = `
    <h2>ResQNet Email Verification</h2>
    <p>Your OTP code is:</p>
    <h1 style="letter-spacing:4px;">${otp}</h1>
    <p>This code will expire in 5 minutes.</p>
  `;
  await sendEmail(email, "Your ResQNet OTP Code", otp);

  return successResponse(res, "OTP sent successfully", { token });
};

// 2️⃣ Verify OTP
exports.verifyOtp = async (req, res) => {
  const { otp, token } = req.body;
  if (!otp || !token)
    return errorResponse(res, 400, "OTP and token are required");

  try {
    const decoded = jwt.verify(token, process.env.JWT_OTP_SECRET);
    console.log("Decoded OTP:", decoded.otp, "User input:", otp);

    // ❌ Wrong OTP
    if (decoded.otp !== otp) {
      console.log("OTP verification error: Invalid OTP");
      return errorResponse(res, 400, "Invalid OTP. Please try again.");
    }

    // ✅ Success
    return successResponse(res, "OTP verified successfully", {
      verified: true,
      email: decoded.email,
    });
  } catch (err) {
    console.log("OTP verification error:", err.message);

    // ⏰ Expired or bad token
    return errorResponse(res, 400, "OTP expired or invalid. Please request a new OTP.");
  }
};
