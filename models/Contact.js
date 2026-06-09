// backend/models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName:   { type: String, required: true, trim: true },
  lastName:    { type: String, required: true, trim: true },
  email:       { type: String, required: true, trim: true },
  phone:       { type: String, default: '' },
  dob:         { type: String, default: '' },
  nationality: { type: String, default: '' },
  inquiryType: { type: String, default: 'general' },
  message:     { type: String, required: true },
  status:      { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);