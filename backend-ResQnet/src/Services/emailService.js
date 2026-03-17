const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function generateOTPEmailTemplate(otp) {
  return `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:40px;">
    <div style="max-width:500px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      
      <div style="background:#1f2937; color:white; padding:20px; text-align:center;">
        <h2 style="margin:0;">ResQNet</h2>
        <p style="margin:0; font-size:14px;">Emergency Response Network</p>
      </div>

      <div style="padding:30px; text-align:center;">
        <h3 style="color:#111;">Verify Your Email</h3>
        <p style="color:#555; font-size:15px;">
          Use the following verification code to complete your registration.
        </p>

        <div style="
          font-size:32px;
          font-weight:bold;
          letter-spacing:6px;
          color:#2563eb;
          margin:20px 0;
          background:#f3f4f6;
          padding:15px;
          border-radius:8px;
          display:inline-block;
          user-select:all;
        ">
          ${otp}
        </div>

        <p style="color:#888; font-size:12px; margin-top:-10px;">
          Tap or select the code to copy
        </p>

        <p style="color:#666; font-size:14px;">
          This code will expire in <b>${5}</b> minutes.
        </p>

        <p style="color:#888; font-size:13px;">
          If you did not request this verification, you can safely ignore this email.
        </p>
      </div>

      <div style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px; color:#777;">
        © ${new Date().getFullYear()} ResQNet. All rights reserved.
      </div>

    </div>
  </div>
  `;
}

async function sendEmail(to, subject, otp) {
  const text = `Your resQnet verification code is ${otp}. It expires in ${process.env.OTP_EXPIRES || 300} seconds.`;
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text,
    html: generateOTPEmailTemplate(otp),
  });
}

module.exports = { sendEmail };
