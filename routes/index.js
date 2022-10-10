const driver = require('./driver')
const user = require('./user')
const record = require('./record')
const router = require('express').Router()

router.use("/users", user)
router.use("/drivers", driver)
router.use('/records', record)

module.exports = router