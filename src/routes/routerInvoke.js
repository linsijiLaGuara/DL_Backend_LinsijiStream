const router = require('express').Router()
const invokeRouter = require('./routerUser')


router.use('/users', invokeRouter)

module.exports = router
