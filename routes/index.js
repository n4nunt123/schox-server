const driver = require('./driver')
const user = require('./user')
const router = require('express').Router()

router.use("/users", user)
router.use("/drivers", driver)

module.exports = router