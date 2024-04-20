const Router = require('express')
const router = new Router()
const recipesRouter = require('./recipesRouter')
const typesRouter = require('./typesRouter')
const brandsRouter = require('./brandsRouter')
const userRouter = require('./userRouter')
const ingridientsRouter = require('./ingridientsRouter')
const feedbackRouter = require('./feedbackRouter')
const forumRouter = require('./forumRouter')


router.use('/user', userRouter)
router.use('/brands', brandsRouter)
router.use('/types', typesRouter)
router.use('/recipes', recipesRouter)
router.use('/feedback', feedbackRouter)
router.use('/forum', forumRouter)
router.use('/ingridients', ingridientsRouter)

module.exports = router