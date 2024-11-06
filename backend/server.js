const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000'  // Explicitly allow requests from this origin
}));

app.use(express.json()); // Middleware to parse JSON bodies

// Sample route to add a candidate
app.post('/api/candidates', (req, res) => {
    const newCandidate = req.body; // Get candidate data from request body
    // Logic to add the candidate to the database or array
    res.status(201).json({ message: 'Candidate added successfully', candidate: newCandidate });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});