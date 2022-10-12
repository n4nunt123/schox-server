const {DriverController} = require('../controllers/DriverController')
const driver = require('express').Router()


driver.get("/", DriverController.getDrivers)
driver.post("/login", DriverController.login)
driver.patch("/balances/:driverId", DriverController.updateBalance)
driver.get("/subscriptions/:driverId", DriverController.checkSubscription) // untuk check apakah sudah booked
driver.get("/chat/:id", DriverController.getDetailChat) // untuk chat

driver.get("/:id", DriverController.getDetailDriver)
driver.patch("/:id", DriverController.updateDriver) // update status driver

module.exports = driver