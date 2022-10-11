const {DriverController} = require('../controllers/DriverController')
const driver = require('express').Router()


driver.post("/login", DriverController.login)
driver.patch("/balances/:driverId", DriverController.updateBalance)
driver.get("/", DriverController.getDrivers)
driver.get("/:id", DriverController.getDetailDriver)

// untuk chat
driver.get("/chat/:id", DriverController.getDetailChat)

driver.patch("/:id") // update status driver

module.exports = driver