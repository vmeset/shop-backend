const mongoose = require('mongoose')

const Type = new mongoose.Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model('Type', Type)