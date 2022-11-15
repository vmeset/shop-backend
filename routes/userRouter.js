const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/registration', [
    check('username', 'Добавь имя').notEmpty(),
    check('password', 'не меньше четырех символов').isLength({min: 4})
], userController.registration)
router.post('/login', userController.login)
router.get('/check', authMiddleware, userController.check)
router.delete('/:id', checkRoleMiddleware('ADMIN'), userController.delete)
router.get('/users', userController.getAll)
router.put('/:id',  checkRoleMiddleware('ADMIN'), userController.updateRole)

module.exports = router