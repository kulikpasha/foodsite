const Router = require('express')
const router = new Router()
const typesController = require('../controllers/typesController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typesController.create)
router.get('/', typesController.getAll)


module.exports = router