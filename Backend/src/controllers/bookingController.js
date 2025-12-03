import pool from "../config/db.js";
import { transporter } from "../config/mailer.js";
import {
  bookingAdminTemplate,
  userBookingReply,
  userBookingConfirmed, // 🔥 new template for accepted booking
} from "../utils/emailTemplates.js";

export const createBooking = async (req, res) => {
  try {
    console.log("📌 Booking Controller Triggered");
    console.log("Received Body:", req.body);

    const {
      name,
      phone,
      email,
      checkIn,
      checkOut,
      roomType,
      guests,
      rooms
    } = req.body;

    if (!name || !phone || !checkIn || !checkOut || !email) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const finalRooms = rooms ? Number(rooms) : 1;
    const status = "pending";

    // Insert with status
    const insertResult = await pool.query(
      `INSERT INTO bookings (
        name, phone, email, check_in, check_out, room_type, guests, rooms, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [name, phone, email, checkIn, checkOut, roomType, guests, finalRooms, status]
    );

    const booking = insertResult.rows[0];

    // Format dates before passing to email templates
      booking.check_in = booking.check_in?.toLocaleDateString("en-CA");
      booking.check_out = booking.check_out?.toLocaleDateString("en-CA");


    // Multi-admin (you already configured ADMIN_EMAIL with comma list)
    const adminEmails = process.env.ADMIN_EMAIL
      ? process.env.ADMIN_EMAIL.split(",").map(e => e.trim()).filter(Boolean)
      : [];

    // Fire admin mail + user ACK asynchronously (don’t block user)
    transporter.sendMail({
      from: process.env.MAIL_USER,
      to: adminEmails[0] || process.env.MAIL_USER,
      bcc: adminEmails.slice(1),
      subject: "📌 New Booking Request (Pending Approval)",
      html: bookingAdminTemplate(booking),
    }).catch(err => console.error("Admin booking mail error:", err));

    transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "🕉️ Booking Request Received",
      html: userBookingReply,
    }).catch(err => console.error("User booking ACK mail error:", err));

    return res.status(200).json({
      success: true,
      message: "Booking submitted successfully and is pending approval.",
      booking,
    });

  } catch (err) {
    console.error("❌ Booking Error:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
};

// ===============================
// GET ALL BOOKINGS (Admin Only)
// ===============================
export const getBookings = async (req, res) => {
  try {
    const { status } = req.query;

    let result;

    if (status) {
      result = await pool.query(
        `SELECT * FROM bookings WHERE status = $1 ORDER BY id DESC`,
        [status]
      );
    } else {
      result = await pool.query(`SELECT * FROM bookings ORDER BY id DESC`);
    }

    // Format check_in & check_out to YYYY-MM-DD only
    const formatted = result.rows.map(b => ({
      ...b,
      check_in: b.check_in ? b.check_in.toLocaleDateString("en-CA") : null,  
      check_out: b.check_out ? b.check_out.toLocaleDateString("en-CA") : null,

    }));

    return res.status(200).json({
      success: true,
      bookings: formatted,
    });

  } catch (err) {
    console.error("❌ getBookings Error:", err);
    return res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
};



export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'accepted' or 'rejected'

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Update row
    const result = await pool.query(
      "UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const booking = result.rows[0];
    // Format dates (no time) before sending to email
    booking.check_in = booking.check_in?.toLocaleDateString("en-CA");
    booking.check_out = booking.check_out?.toLocaleDateString("en-CA");


    // If accepted, send confirmation mail to user
    if (status === "accepted") {
      transporter.sendMail({
        from: process.env.MAIL_USER,
        to: booking.email,
        subject: "✅ Your Booking is Confirmed - Ganesh Akhara",
        html: userBookingConfirmed(booking),
      }).catch(err => console.error("User booking confirm mail error:", err));
    }

    // (Optionally send rejection mail too if you want another template)

    return res.status(200).json({
      success: true,
      message: `Booking ${status} successfully.`,
      booking,
    });

  } catch (err) {
    console.error("❌ updateBookingStatus Error:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
};

// GET /api/bookings/all?status=accepted|rejected|pending
export const getAllBookings = async (req, res) => {
  try {
    const { status } = req.query;

    let sql = "SELECT * FROM bookings";
    const params = [];

    if (status) {
      sql += " WHERE status = $1"; 
      params.push(status);
    }

    sql += " ORDER BY id DESC";

    const result = await pool.query(sql, params);

    // Format check_in & check_out to YYYY-MM-DD only
    const formatted = result.rows.map(b => ({
      ...b,
      check_in: b.check_in ? b.check_in.toLocaleDateString("en-CA") : null,
      check_out: b.check_out ? b.check_out.toLocaleDateString("en-CA") : null
    }));

    return res.json({ bookings: formatted });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error loading bookings" });
  }
};

