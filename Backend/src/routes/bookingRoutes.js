// import express from "express";
// import { createBooking, getBookings, updateBookingStatus, getAllBookings } from "../controllers/bookingController.js";
// import { validateBooking } from "../middleware/validate.js";

// const router = express.Router();
// router.post("/create", (req, res, next) => {
//   console.log("🔥 Booking API Hit:", req.body);
//   next();
// });

// router.post("/create", validateBooking, createBooking);

// router.get("/all", getAllBookings);


// // Admin: list bookings (optionally filter: ?status=pending)
// router.get("/", getBookings);



// router.patch("/:id/status", updateBookingStatus);

// export default router;

import express from "express";
import {
  createBooking,
  getBookings,
  updateBookingStatus,
  getAllBookings
} from "../controllers/bookingController.js";
import { validateBooking } from "../middleware/validate.js";

const router = express.Router();

// Proper logging + validation + controller in ONE route
router.post("/create",
  (req, res, next) => {
    console.log("🔥 Booking API Hit:", req.body);
    next();
  },
  validateBooking,
  createBooking
);

// Get ALL bookings (admin)
router.get("/all", getAllBookings);

// Get filtered bookings by status (?status=pending)
router.get("/", getBookings);

// Update booking status (accept / reject)
router.patch("/:id/status", updateBookingStatus);

export default router;
