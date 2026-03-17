/**
 * src/utils/otp.js
 * Helpers to generate, hash OTP and timing-safe compare.
 */

const crypto = require("crypto");

function generateOtp() {
  // 6-digit numeric OTP
  return String(Math.floor(100000 + Math.random() * 900000));
}

function hashOtp(otp) {
  // SHA-256 hex
  return crypto.createHash("sha256").update(String(otp)).digest("hex");
}

function timingSafeCompare(hexA, hexB) {
  try {
    const a = Buffer.from(String(hexA), "hex");
    const b = Buffer.from(String(hexB), "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch (err) {
    return false;
  }
}

module.exports = { generateOtp, hashOtp, timingSafeCompare };
