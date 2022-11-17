const deviceModel = require('../models/deviceModel')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs');

class deviceController {
    async create(req, res, next) {
        try {
            const {label, price, brandId, typeId, info} = req.body
            const {img} = req.file
            let fileName = uuid.v4() + ".jpg"
            const device = await deviceModel.create({label, price, brandId, typeId, img: req.file.filename, info})
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let {brandId, typeId, page, limit } = req.query
            limit = limit || 30
            page = page || 1
            let offset = page * limit - limit
            let devices
            let totalCount
            if(!brandId && !typeId) {
                devices = await deviceModel.find().skip(parseInt(offset)).limit(parseInt(limit))
                totalCount = await deviceModel.count()
            }
            if(!brandId && typeId) {
                devices = await deviceModel.find({typeId}).skip(parseInt(offset)).limit(parseInt(limit))
                totalCount = await deviceModel.count({typeId})
            }
            if(brandId && !typeId) {
                devices = await deviceModel.find({brandId}).skip(parseInt(offset)).limit(parseInt(limit))
                totalCount = await deviceModel.count({brandId})
            }
            if(brandId && typeId) {
                devices = await deviceModel.find({brandId, typeId}).skip(parseInt(offset)).limit(parseInt(limit))
                totalCount = await deviceModel.count({brandId, typeId})
            }
            return res.json({devices, totalCount})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const device = await deviceModel.findById(req.params.id)
            return res.json(device)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const device = req.body
            const updatedDevice = await deviceModel.findByIdAndUpdate(device._id, device, {new: true})
            return res.json(updatedDevice)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const deletedDevice = await deviceModel.findByIdAndRemove(req.params.id)
            let filePath = path.resolve(__dirname, '..', 'uploads', `${deletedDevice.img}`)
            fs.unlinkSync(filePath)
            return res.json(deletedDevice)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new deviceController()