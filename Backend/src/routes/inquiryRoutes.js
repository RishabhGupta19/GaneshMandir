import express from "express";
import { submitInquiry } from "../controllers/inquiryController.js";
import { validateInquiry } from "../middleware/validate.js";

const router = express.Router();
router.post("/submit", (req, res, next) => {
  console.log("🔥 Inquiry API Hit:", req.body);  // <-- CONFIRMATION LOG
  next();
});


router.post("/submit", validateInquiry, submitInquiry);

export default router;
