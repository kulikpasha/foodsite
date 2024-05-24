const Router = require('express')
const router = new Router()
const typesController = require('../controllers/typesController')

router.post('/', typesController.create)
router.get('/', typesController.getAll)


module.exports = router