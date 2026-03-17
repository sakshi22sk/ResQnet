/**
 * src/services/notifyService.js
 * Sends OTP via email (nodemailer) and optionally via SMS (Twilio).
 *
 * Notes:
 * - Configure mail via MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM.
 * - For SMS, set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER and install twilio if using SMS.
 */

const nodemailer = require("nodemailer");

const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = parseInt(process.env.MAIL_PORT || "587", 10);
const MAIL_SECURE = process.env.MAIL_SECURE === "true";
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;
const MAIL_FROM = process.env.MAIL_FROM || MAIL_USER;

let transporter = null;
if (MAIL_HOST && MAIL_USER) {
  transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: MAIL_SECURE,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });
} else {
  console.warn("Mail not fully configured. OTP emails will not be sent.");
}

async function sendEmailOtp(email, otp) {
  if (!transporter) {
    console.warn("sendEmailOtp: transporter not configured - OTP for", email, "is", otp);
    return;
  }

  const subject = "resQnet verification code";
  const text = `Your resQnet verification code is ${otp}. It expires in ${process.env.OTP_EXPIRES || 300} seconds.`;
  const html = `<p>Your resQnet verification code is <strong>${otp}</strong>.</p><p>It expires in ${process.env.OTP_EXPIRES || 300} seconds.</p>`;

  await transporter.sendMail({
    from: MAIL_FROM,
    to: email,
    subject,
    text,
    html,
  });
}

// Optional Twilio SMS sender. Install twilio package if you want SMS:
// npm install twilio
async function sendSmsOtp(phone, otp) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (!sid || !token || !from) {
    console.warn("Twilio not configured - skipping SMS send. OTP for", phone, "is", otp);
    return;
  }

  // Require dynamically to avoid crash if not installed and not used
  const twilio = require("twilio")(sid, token);
  await twilio.messages.create({
    body: `resQnet verification code: ${otp}`,
    from,
    to: phone,
  });
}

module.exports = { sendEmailOtp, sendSmsOtp };
