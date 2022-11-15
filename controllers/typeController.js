const typeModel = require('../models/typeModel')
const ApiError = require('../error/ApiError')

class typeController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const type = await typeModel.create({name})
            return res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await typeModel.find()
            return res.json(brands)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const deletedType = await typeModel.findByIdAndRemove(req.params.id)
            return res.json(deletedType)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new typeController()