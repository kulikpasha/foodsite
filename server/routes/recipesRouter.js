const Router = require('express')
const router = new Router()
const recipesController = require('../controllers/recipesController')

router.post('/', recipesController.create)
router.get('/', recipesController.getAll)
router.get('/:id', recipesController.getOne)


module.exports = router