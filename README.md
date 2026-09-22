# 🦷 Timeless Dental Clinic — Full Stack Management System

A modern, production-ready dental practice management system built for **Timeless Dental Clinic**, Harare, Zimbabwe. It handles appointments, doctor scheduling, patient communication, AI-powered dental advice, and role-based access for clients, receptionists, and IT administrators.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [User Roles](#-user-roles)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Database](#-database)
- [API Reference](#-api-reference)
- [Frontend Routes](#-frontend-routes)
- [Doctor Scheduling System](#-doctor-scheduling-system)
- [AI Assistant](#-ai-assistant)
- [Deployment](#-deployment)
- [Default IT Admin](#-default-it-admin)
- [Branch Information](#-branch-information)
- [Working Hours](#-working-hours)
- [Social Media](#-social-media)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 📖 Overview

**Timeless Dental Clinic** is a full-stack web application serving two branches in Harare:

- **Westgate Mall** — Timeless Dental Clinic
- **Newlands Shopping Centre** — Timeless Dental Clinic

The system provides real-time appointment booking, doctor scheduling across branches, an AI dental assistant available to guests, and complete administrative control for the IT department.

---

## ✨ Features

### 🧑‍⚕️ For Clients
- Secure registration and login
- Real-time appointment booking
- See which doctors are available before booking
- View, manage, and cancel appointments
- Public access to the AI dental assistant (no login required)
- Direct messaging to reception

### 👩‍💼 For Receptionists
- Approve, cancel, or complete appointments
- Manually create appointments for walk-ins
- Manage doctor schedules across branches
- Read and reply to client messages
- Search and filter appointments by status, date, or client

### 🛠️ For IT Administrators
- Complete system control
- Create, edit, deactivate, or delete users
- Grant and revoke IT privileges
- Manage doctors and their specializations
- Manage doctor schedules
- Monitor all activity logs
- Full dashboard with system statistics

### 🤖 AI Assistant
- Publicly accessible — no login required
- Handles greetings, follow-ups, and dental questions
- Provides evidence-based dental advice (pain, swelling, sensitivity, whitening, etc.)
- Escalates to a receptionist when requested (login required for this action)
- Uses OpenAI when configured; otherwise falls back to rule-based responses

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, React Router 6, Tailwind CSS 3, React Query, React Icons, React Hot Toast, Axios |
| **Backend** | Node.js, Express, Mongoose, JWT, Nodemailer, OpenAI SDK |
| **Database** | MongoDB Atlas (cloud) |
| **Deployment** | Vercel (frontend), Render (backend), MongoDB Atlas (database) |
| **Dev Tools** | Nodemon, ESLint, PostCSS, Autoprefixer |

---

## 📁 Project Structure
timeless-dental-clinic/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ │ ├── database.js
│ │ │ └── email.js
│ │ ├── controllers/
│ │ │ ├── authController.js
│ │ │ ├── appointmentController.js
│ │ │ ├── messageController.js
│ │ │ ├── userController.js
│ │ │ ├── scheduleController.js
│ │ │ └── aiController.js
│ │ ├── middleware/
│ │ │ ├── auth.js
│ │ │ ├── optionalAuth.js
│ │ │ └── roles.js
│ │ ├── models/
│ │ │ ├── User.js
│ │ │ ├── Appointment.js
│ │ │ ├── Message.js
│ │ │ ├── Schedule.js
│ │ │ └── ActivityLog.js
│ │ ├── routes/
│ │ │ ├── authRoutes.js
│ │ │ ├── appointmentRoutes.js
│ │ │ ├── messageRoutes.js
│ │ │ ├── userRoutes.js
│ │ │ ├── scheduleRoutes.js
│ │ │ └── aiRoutes.js
│ │ ├── services/
│ │ │ └── aiService.js
│ │ ├── utils/
│ │ │ └── helpers.js
│ │ └── server.js
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── public/
│ │ ├── index.html
│ │ ├── manifest.json
│ │ ├── robots.txt
│ │ └── favicon.svg
│ ├── src/
│ │ ├── components/
│ │ │ ├── common/ # Navbar, Footer, PrivateRoute, Modal, Skeleton, ErrorBoundary
│ │ │ ├── auth/ # Login, Register, ForgotPassword, ResetPassword
│ │ │ ├── client/ # BookAppointment, ViewAppointments, AIChat
│ │ │ ├── receptionist/ # ReceptionDashboard
│ │ │ ├── it/ # ITDashboard, ManageUsers, ManageDoctors,
│ │ │ │ # ManageAppointments, ActivityMonitor
│ │ │ └── shared/ # Locations, ContactUs, ManageSchedule
│ │ ├── context/
│ │ │ └── AuthContext.jsx
│ │ ├── hooks/
│ │ │ ├── useAppointments.js
│ │ │ └── useMessages.js
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ ├── About.jsx
│ │ │ ├── Services.jsx
│ │ │ └── Dashboard.jsx
│ │ ├── services/
│ │ │ ├── api.js
│ │ │ └── socket.js
│ │ ├── styles/
│ │ │ └── global.css
│ │ ├── App.jsx
│ │ └── index.jsx
│ ├── .env
│ ├── .env.production
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ └── package.json
│
└── README.md

---

## 👥 User Roles

| Role | Description | Access |
|------|-------------|--------|
| **Client** | Registered patient | Book appointments, view own appointments, message reception, use AI chat |
| **Receptionist** | Front-desk staff | All client access + manage all appointments, manage schedules, view messages |
| **Doctor** | Dental practitioner | Assigned to appointments and schedule slots |
| **IT Admin** | System administrator | Full control — user management, scheduling, monitoring, system configuration |

> **Receptionists** log in with their **Username + Receptionist ID** (no password needed). The unique Receptionist ID is auto-generated by IT when creating their account.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18 or later
- **npm** v9 or later
- **MongoDB** — local instance or MongoDB Atlas cluster
- **Git**

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env       # then edit .env with your values
npm run dev                # runs on http://localhost:5000