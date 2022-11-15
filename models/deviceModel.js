const mongoose = require('mongoose')

// const DeviceInfo = new mongoose.Schema({
//     title: {type: String}, 
//     description: {type: String}, 
//     number: {type: String}
// })

const Device = new mongoose.Schema({
    label: {type: String, required: true},
    price: {type: Number, required: true},
    brandId: {type: String, required: true},
    typeId: {type: String, required: true},
    img: {type: String, required: true},
    // info: [DeviceInfo]
})

module.exports = mongoose.model('Device', Device)