
export const validateBooking = (req, res, next) => {
  const { name, phone, email, checkIn, checkOut, roomType, guests, rooms } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: "Invalid name" });
  }

  if (!phone || !/^[0-9]{10}$/.test(phone)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (!checkIn || !checkOut) {
    return res.status(400).json({ error: "Check-in and Check-out dates required" });
  }

  if (new Date(checkOut) < new Date(checkIn)) {
    return res.status(400).json({ error: "Check-out date cannot be earlier than check-in" });
  }

  if (!roomType) {
    return res.status(400).json({ error: "Room type is required" });
  }

  if (!guests || guests < 1) {
    return res.status(400).json({ error: "Invalid guest count" });
  }

 

  next();
};


export const validateInquiry = (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: "Invalid name" });
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (!message || message.trim().length <= 2) {
    return res.status(400).json({ error: "Message must be at least 5 characters" });
  }

  next();
};
