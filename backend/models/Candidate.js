const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    experience: { type: String, required: true },
    skills: { type: [String], required: true }
});

module.exports = mongoose.model('Candidate', candidateSchema);