require('dotenv').config()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const ApiError = require("../error/ApiError")

const userModel = require('../models/userModel')

const {validationResult} = require('express-validator')

const secret = process.env.SECRET_KEY

const generateAccessToken = (_id, username, role) => {
    const payload = {
        _id,
        username,
        role
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(errors))
            }
            const {username, password, role} = req.body
            const candidate = await userModel.findOne({username})
            if(candidate) {
                return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
            }
            const hashPassword = bcrypt.hashSync(password, 5)
            // const userRole = await roleModel.findOne({value: "USER"})
            const newUser = new userModel({username, password: hashPassword, role})
            await newUser.save()
            const token = generateAccessToken(newUser._id, newUser.username, newUser.role)
            return res.json({token})
            // return res.json(`Пользователь ${username} успешно зареган`)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body
            const user = await userModel.findOne({username})
            if(!user) {
                return next(ApiError.badRequest('такого пользователя не существует'))
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return next(ApiError.badRequest('неверный пароль'))
            }
            const token = generateAccessToken(user._id, user.username, user.role)
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res, next) {
        try {
            const token = generateAccessToken(req.user._id, req.user.username, req.user.role)
            return res.json({token})
        } catch(e) {
            next(ApiError.forbidden(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const deletedUser = await userModel.findByIdAndDelete(req.params.id)
            return res.json(deletedUser)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await userModel.find()
            return res.json(users)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateRole(req, res, next) {
        try {
            const user = req.body
            const updatedUser = await userModel.findByIdAndUpdate(user._id, user, {new: true})
            return res.json(updatedUser)
        } catch {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()