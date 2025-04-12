const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema({
    user_id: {
        type: String,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
    },
    subject:{
        type: String,
        required: true
    },
    complaint_details: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
