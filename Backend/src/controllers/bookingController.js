
// New code 


import pool from "../config/db.js";
import { Resend } from "resend";
import {
  bookingAdminTemplate,
  userBookingReply,
  userBookingConfirmed,
} from "../utils/emailTemplates.js";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ===============================
// CREATE BOOKING
// ===============================
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
      rooms,
    } = req.body;

    if (!name || !phone || !checkIn || !checkOut || !email) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const finalRooms = rooms ? Number(rooms) : 1;
    const status = "pending";

    // Save to DB
    const insertResult = await pool.query(
      `INSERT INTO bookings (
        name, phone, email, check_in, check_out, room_type, guests, rooms, status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [name, phone, email, checkIn, checkOut, roomType, guests, finalRooms, status]
    );

    const booking = insertResult.rows[0];

    // Format dates for mail
    booking.check_in = booking.check_in?.toLocaleDateString("en-CA");
    booking.check_out = booking.check_out?.toLocaleDateString("en-CA");

    // Admin email list
    const adminEmails = process.env.ADMIN_EMAIL
      ? process.env.ADMIN_EMAIL.split(",").map(e => e.trim())
      : [];

    // ===============================
    // SEND ADMIN MAIL
    // ===============================
    resend.emails.send({
      from: "Ganesh Akhara <noreply@ganeshakhara.com>",
      to: adminEmails,  
      subject: "📌 New Booking Request (Pending Approval)",
      html: bookingAdminTemplate(booking),
    }).catch(err => console.error("Admin booking mail error:", err));

    // ===============================
    // SEND USER ACKNOWLEDGEMENT
    // ===============================
    resend.emails.send({
      from: "Ganesh Akhara <noreply@ganeshakhara.com>",
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
// GET BOOKINGS WITH OPTIONAL FILTER
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

    const formatted = result.rows.map(b => ({
      ...b,
      check_in: b.check_in ? b.check_in.toLocaleDateString("en-CA") : null,
      check_out: b.check_out ? b.check_out.toLocaleDateString("en-CA") : null,
    }));

    res.status(200).json({ success: true, bookings: formatted });

  } catch (err) {
    console.error("❌ getBookings Error:", err);
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
};


// ===============================
// UPDATE BOOKING STATUS
// ===============================
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const result = await pool.query(
      "UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const booking = result.rows[0];

    booking.check_in = booking.check_in?.toLocaleDateString("en-CA");
    booking.check_out = booking.check_out?.toLocaleDateString("en-CA");

    // Send confirmation only if ACCEPTED
    if (status === "accepted") {
      resend.emails.send({
        from: "Ganesh Akhara <noreply@ganeshakhara.com>",
        to: booking.email,
        subject: "✅ Your Booking is Confirmed - Ganesh Akhara",
        html: userBookingConfirmed(booking),
      }).catch(err => console.error("User confirm mail error:", err));
    }

    res.status(200).json({
      success: true,
      message: `Booking ${status} successfully.`,
      booking,
    });

  } catch (err) {
    console.error("❌ updateBookingStatus Error:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
};


// ===============================
// GET ALL BOOKINGS
// ===============================
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

    const formatted = result.rows.map(b => ({
      ...b,
      check_in: b.check_in ? b.check_in.toLocaleDateString("en-CA") : null,
      check_out: b.check_out ? b.check_out.toLocaleDateString("en-CA") : null,
    }));

    res.json({ bookings: formatted });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error loading bookings" });
  }
};

