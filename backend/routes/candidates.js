// Example using Express.js
const express = require('express');
const router = express.Router();

// POST route to add a new candidate
router.post('/api/candidates', (req, res) => {
    const { name, phone, email, gender, experience, skills } = req.body;
    
    // Logic to add the candidate to the database
    // Example:
    const newCandidate = new Candidate({
        name,
        phone,
        email,
        gender,
        experience,
        skills
    });

    newCandidate.save()
        .then(candidate => res.status(201).json(candidate))
        .catch(err => res.status(400).json({ message: "Error saving candidate", error: err }));

        res.json({a:"hi"})
});
