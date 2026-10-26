# Ticket-Raise

A full-stack MERN (MongoDB, Express, React, Node.js) ticketing and issue management application.

## Features
- Create, track, and manage support tickets
- Real-time status tracking (Open, In Progress, Resolved)
- Clean, responsive React frontend with Vite
- RESTful Express API backed by MongoDB

## Tech Stack
- **Frontend**: React, Vite, React Router DOM, TailwindCSS / CSS
- **Backend**: Node.js, Express, Mongoose, CORS, Dotenv
- **Database**: MongoDB

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance running locally or MongoDB Atlas

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   npm install
   ```
2. Configure `.env` using `.env.example`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/ticket_raise
   ```
3. Start the backend:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
