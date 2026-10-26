const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  raiserName: { // <-- NEW FIELD
    type: String, 
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, required: true },
  status: { type: String, default: 'Open' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);