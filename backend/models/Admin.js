const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    notifications: [{
        type: {
            type: String,
            enum: ['edit_request', 'other'],
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

module.exports = mongoose.model('Admin', adminSchema); 