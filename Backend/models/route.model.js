const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema({
    route_id: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    stations: [{
        type: [],
        ref: 'Station'
    }]
}, { timestamps: true })

module.exports = mongoose.model('Route', routeSchema)