const Router = require('express')
const router = new Router()
const brandsController = require('../controllers/brandsController')

router.post('/',brandsController.create)
router.get('/',brandsController.getAll)


module.exports = router