const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({ 
    user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
route_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
},
purchase_time: {
    type: Date,
    required: true
},
valid_until: {
    type: Date,
    required: true
}
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema)