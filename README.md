
# ============================================================
# 🕉️ GANESH AKHARA OFFICIAL WEBSITE & BOOKING SYSTEM
# ============================================================
#
# A full-stack production website for Ganesh Akhara Mandir.
# Includes:
#   - Online room booking system
#   - Admin approval dashboard
#   - Automated emails (Resend)
#   - Inquiry management
#   - Fully deployed with real-time usage
#
# ============================================================
# 🚀 FEATURES
# ============================================================
#
# 🌐 USER WEBSITE
# - Room booking (Check-In, Check-Out, Guests, Rooms, Type)
# - Inquiry submission
# - Responsive modern UI
# - Real-time toast notifications
#
# 🧾 BOOKING SYSTEM
# - Saves bookings to PostgreSQL
# - Sends acknowledgment to user
# - Sends booking request to admins
#
# 🛡️ ADMIN DASHBOARD
# - View pending/accepted/rejected bookings
# - Approve / Reject bookings
# - Auto email on booking confirmation
#
# ✉️ EMAIL AUTOMATION (RESEND)
# - Verified domain: ganeshakhara.com
# - Sender: noreply@ganeshakhara.com
# - Emails:
#     * Admin booking notification
#     * User acknowledgment
#     * User booking confirmation
#     * Inquiry notification + reply
#
# 🗄️ DATABASE
# - PostgreSQL (Render)
# - Tables: bookings, inquiries
#
# ☁️ DEPLOYMENT
# - Frontend → Vercel
# - Backend → Render
# - DB → Render PostgreSQL
# - Email → Resend API
#
# ============================================================
# 🛠️ TECH STACK
# ============================================================
#
# Frontend: React + Tailwind + Vercel
# Backend: Node.js + Express
# Database: PostgreSQL
# Email: Resend API
# Deployment: Render + Vercel
#
# ============================================================
# 📦 ENVIRONMENT VARIABLES
# ============================================================
#
# Add these into your `.env` file:
#
# PORT=5000
# DATABASE_URL=your_postgres_url
# RESEND_API_KEY=your_resend_api_key
# ADMIN_EMAIL=mail1@gmail.com,mail2@gmail.com
# MAIL_FROM=noreply@ganeshakhara.com
#
# ============================================================
# 🧱 DATABASE SCHEMA
# ============================================================
#
# --- BOOKINGS TABLE ---
# id SERIAL PRIMARY KEY
# name TEXT
# phone TEXT
# email TEXT
# check_in DATE
# check_out DATE
# room_type TEXT
# guests INT
# rooms INT
# status TEXT DEFAULT 'pending'
#
# --- INQUIRIES TABLE ---
# id SERIAL PRIMARY KEY
# name TEXT
# email TEXT
# message TEXT
# created_at TIMESTAMP DEFAULT NOW()
#
# ============================================================
# ▶️ RUNNING THE PROJECT LOCALLY
# ============================================================
#
# --- BACKEND ---
# cd Backend
# npm install
# npm start
#
# --- FRONTEND ---
# cd frontend
# npm install
# npm run dev
#
# ============================================================
# 🌍 LIVE LINKS
# ============================================================
#
# Website: https://www.ganeshakhara.com
# Backend API: (Render)
#
# ============================================================
# 📌 PROJECT HIGHLIGHTS
# ============================================================
#
# - Official Mandir website with real visitors
# - Online booking workflow with admin approval
# - Automated email pipeline (Resend)
# - Fully deployed backend + DB on Render
# - Professional UI/UX with real-time toasts
# - Production-ready architecture
#
# ============================================================
# 👨‍💻 DEVELOPER
# ============================================================
#
# Rishabh Gupta
# Email: rishabh134we@gmail.com
# GitHub: https://github.com/RishabhGupta19
#
# ============================================================
