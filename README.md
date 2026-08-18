# 🎬 Movie Ticket Booking Platform

A full-stack movie ticket booking application that allows users to browse movies, view show timings, select seats, and book tickets seamlessly.

## 🌐 Live Demo  kajsdl alkdfj lka

🚀 Experience the application live:

[Movie Ticket Booking Platform](https://movie-ticket-booking-front-end.vercel.app/)

---

## 📌 Overview

This platform provides a complete movie ticket booking experience with secure authentication, real-time seat selection, booking management, and an admin dashboard for managing shows and bookings.

Users can:

- Browse available movies
- View movie details and trailers
- Check available show timings
- Select seats visually
- Book movie tickets
- Manage personal bookings
- Save favorite movies

Admins can:

- Add new shows
- Manage movie screenings
- View all bookings
- Monitor platform activity through dashboard analytics

---

## ✨ Features

### 👤 User Features

- Secure Authentication with Clerk
- Browse Movies
- Movie Details Page
- Trailer Preview
- Favorite Movies
- Interactive Seat Selection
- Ticket Booking System
- My Bookings Page
- Responsive Design
- Fast Navigation with React Router

### 🛠️ Admin Features

- Admin Dashboard
- Add New Shows
- Manage Existing Shows
- View Booking Records
- Show Management System

### ⚡ Backend Features

- REST API Architecture
- MongoDB Database Integration
- Authentication Middleware
- Booking Management
- Show Management
- User Management
- Scalable Event-Driven Architecture with Inngest

---

## 🏗️ Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- React Hot Toast
- React Icons
- React Player
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Clerk Authentication
- Inngest
- Axios
- Cloudinary

### Deployment

- Vercel (Frontend)
- Vercel / Node Environment (Backend)

---

## 📂 Project Structure

```bash
Movie_Ticket_Booking_Project
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── configs/
│   ├── Inngest/
│   └── ...
│
└── README.md
```

---

## 🔐 Authentication

The project uses **Clerk Authentication** for:

- User Sign Up
- User Login
- Session Management
- Protected Routes
- User Identity Management

---

## 🎟️ Booking Flow

1. User logs in
2. Selects a movie
3. Chooses a show timing
4. Selects available seats
5. Confirms booking
6. Booking is stored in MongoDB
7. Booking appears in "My Bookings"

---

## 🚀 Upcoming Features

### 📧 Booking Confirmation Email

Planned implementation using:

- Clerk User Management
- Inngest Event Triggers
- Automated Booking Confirmation Emails

After successful booking:

- Confirmation email will be sent automatically
- Movie details included
- Show timing included
- Seat information included
- Booking summary included

### 💳 Online Payment Integration

- Razorpay / Stripe Integration
- Secure Payment Processing
- Transaction History

### 🎫 Downloadable Tickets

- PDF Ticket Generation
- QR Code Verification

### 🔔 Notifications

- Booking Reminders
- Show Updates
- Promotional Alerts

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm run server
```

---

## 🔑 Environment Variables

### Server

```env
MONGODB_URI=
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=
TMDB_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 📸 Core Modules

- Authentication Module
- Movie Management
- Show Management
- Seat Selection System
- Booking Management
- Admin Dashboard
- User Dashboard
- Event Handling (Inngest)

---

## 🎯 Future Scalability

This project is designed with scalability in mind:

- Event-Driven Workflows
- Modular Architecture
- Separate Frontend & Backend
- Cloud Deployment Ready
- Easy Third-Party Integrations

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---


## 👨‍💻 Developer

**Dinesh Upadhyay**

Full Stack Developer

Built with ❤️ using React, Node.js, MongoDB, Clerk, Inngest, and Tailwind CSS.

🌐 Portfolio: https://dinesh-upadhyay-portfolio-jbh1.vercel.app/

💼 LinkedIn: https://www.linkedin.com/in/dinesh-upadhyay-030487247/

🚀 Built with React, Node.js, MongoDB, Clerk, Inngest, Tailwind CSS, and Express.js.

---

## ⭐ Support

If you like this project, please give it a ⭐ on Dinesh's GitHub.
