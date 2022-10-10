const {DriverController} = require('../controllers/DriverController')
const driver = require('express').Router()


driver.post("/login", DriverController.login)
driver.patch("/balances/:driverId", DriverController.updateBalance)
driver.get("/", DriverController.getDrivers)
driver.get("/:id", DriverController.getDetailDriver)

module.exports = driver