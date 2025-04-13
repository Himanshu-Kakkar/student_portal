const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get('/api/test', (req, res) => {
    res.json({
        status: 'success',
        message: 'Backend is working!',
        timestamp: new Date().toISOString()
    });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const { default: mongoose } = require("mongoose");


mongoose.connect("mongodb+srv://himanshukakkar917:XkfYLdX0QRbIGQ70@cluster0.hx9thex.mongodb.net/students");

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String
});

