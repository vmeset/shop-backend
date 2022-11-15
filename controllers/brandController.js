const brandModel = require('../models/brandModel')
const ApiError = require('../error/ApiError')

class brandController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const brand = await brandModel.create({name})
            return res.json(brand)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await brandModel.find()
            return res.json(brands)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const deletedBrand = await brandModel.findByIdAndRemove(req.params.id)
            return res.json(deletedBrand)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new brandController()