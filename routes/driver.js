const {DriverController} = require('../controllers/DriverController')
const driver = require('express').Router()

driver.post("/login", DriverController.login)

driver.get("/schedules")

driver.post("/records")
driver.patch("/records/:id")

driver.get("/balances/:id")
driver.patch("/balances/:id")

driver.get("/:id")
driver.patch("/:id")

module.exports = driver