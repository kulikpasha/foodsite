const Router = require('express')
const router = new Router()
const recipesController = require('../controllers/recipesController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'),recipesController.create)
router.get('/', recipesController.getAll)
router.get('/:id', recipesController.getOne)


module.exports = router