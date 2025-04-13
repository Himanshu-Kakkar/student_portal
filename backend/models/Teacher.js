const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    subjects: [{
        type: String
    }],
    notifications: [{
        type: {
            type: String,
            enum: ['mark_request', 'other'],
            required: true
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        message: String,
        status: {
            type: String,
            enum: ['unread', 'read'],
            default: 'unread'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Teacher', teacherSchema); 