const mongoose = require('mongoose')

const Brand = new mongoose.Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model('Brand', Brand)