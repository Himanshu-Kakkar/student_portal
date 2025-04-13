const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rollNo: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    marks: [{
        subject: String,
        marks: Number,
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    editRequests: [{
        field: String,
        newValue: String,
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
        message: String
    }],
    markRequests: [{
        subject: String,
        currentMarks: Number,
        requestedMarks: Number,
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
        message: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema); 