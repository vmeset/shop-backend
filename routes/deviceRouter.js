const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const imgMiddleware = require('../middleware/imgMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), imgMiddleware.single('img'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.put('/', checkRoleMiddleware('ADMIN'), imgMiddleware.single('img'), deviceController.update)
router.delete('/:id', checkRoleMiddleware('ADMIN'), deviceController.delete)

module.exports = router