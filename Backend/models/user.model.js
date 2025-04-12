const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    ticket_history:{
        type: Array,
        required: false
    }
   }, {timestamps: true})

   
module.exports = mongoose.model('User', userSchema) 