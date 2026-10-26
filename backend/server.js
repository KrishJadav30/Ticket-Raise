// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Ticket = require('./models/Ticket');

const app = express();

// Middleware
app.use(cors()); // Allows React to connect
app.use(express.json()); // Parses incoming JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// --- API ROUTES ---

// 1. GET all tickets (sorted newest first)
app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ date: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST a new ticket
app.post('/api/tickets', async (req, res) => {
  const ticket = new Ticket({
    raiserName: req.body.raiserName, // <-- WE WERE MISSING THIS LINE!
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    priority: req.body.priority
  });

  try {
    const newTicket = await ticket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    console.error("Failed to save ticket:", err); // Helps with debugging
    res.status(400).json({ message: err.message });
  }
});

// ... existing GET and POST routes ...

// 3. PATCH update a ticket (e.g., mark as Resolved)
app.patch('/api/tickets/:id', async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true } // Returns the updated document
    );
    res.json(updatedTicket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});