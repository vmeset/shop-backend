const mongoose = require('mongoose')

const User = new mongoose.Schema({
    // id: {type: Number, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: "USER", required: true}
})

module.exports = mongoose.model('User', User)