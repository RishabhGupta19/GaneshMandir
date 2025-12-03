// import pool from "../config/db.js";
// import { transporter } from "../config/mailer.js";
// import { inquiryAdminTemplate, userInquiryReply } from "../utils/emailTemplates.js";

// export const submitInquiry = async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message)
//       return res.status(400).json({ error: "Missing fields" });

//      await pool.query(
//   `INSERT INTO inquiries (name, email, message)
//    VALUES ($1, $2, $3)`,
//   [name, email, message]
// );


//     await transporter.sendMail({
//       from: process.env.MAIL_USER,
//       to: process.env.ADMIN_EMAIL,
//       subject: "📌 New Inquiry Received",
//       html: inquiryAdminTemplate(req.body),
//     });

//     await transporter.sendMail({
//       from: process.env.MAIL_USER,
//       to: email,
//       subject: "🙏 We Received Your Message",
//       html: userInquiryReply,
//     });

//     res.json({ message: "Inquiry submitted successfully" });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };




import pool from "../config/db.js";
import { transporter } from "../config/mailer.js";
import { inquiryAdminTemplate, userInquiryReply } from "../utils/emailTemplates.js";

export const submitInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Save inquiry to DB
    await pool.query(
      `INSERT INTO inquiries (name, email, message)
       VALUES ($1, $2, $3)`,
      [name, email, message]
    );

    // -----------------------------
    //   📩 MULTIPLE ADMIN EMAILS
    // -----------------------------
    // Split admin emails from ADMIN_EMAIL (.env)
const adminEmails = process.env.ADMIN_EMAIL
  ? process.env.ADMIN_EMAIL.split(",").map(e => e.trim()).filter(Boolean)
  : [];

if (!adminEmails.length) {
  console.warn("⚠ No admin emails found in ADMIN_EMAIL");
}


    // Admin mail — first in "to:", rest in "bcc:"
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: adminEmails[0] || process.env.MAIL_USER,
      bcc: adminEmails.slice(1),
      subject: "📌 New Inquiry Received",
      html: inquiryAdminTemplate({ name, email, message }),
    });

    // -----------------------------
    //   📩 USER CONFIRMATION EMAIL
    // -----------------------------
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "🙏 We Received Your Inquiry",
      html: userInquiryReply,
    });

    return res.status(200).json({ success: true, message: "Inquiry submitted successfully" });


  } catch (err) {
    console.error("❌ Inquiry Error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
