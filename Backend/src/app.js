import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import bookingRoutes from "./routes/bookingRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";


dotenv.config();

const app = express();
app.use(cors({
  origin: "*"
}));

app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
  console.log("📥 Incoming Request:", req.method, req.url);
  next();
});

app.use("/api/bookings", bookingRoutes);


app.use("/api/inquiries", inquiryRoutes);

app.get("/", (req, res) => {
  res.send("Temple Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
