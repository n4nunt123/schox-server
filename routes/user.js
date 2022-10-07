const UserController = require('../controllers/UserController')
const user = require('express').Router()

user.post("/register", UserController.register)
user.post("/login", UserController.login)

user.post("/schools", UserController.postSchools)

user.post("/balances", UserController.postBalances)
user.get("/balances/:id", UserController.getBalance)
user.patch("/balances/:id", UserController.updateBalance)

user.post("/subscriptions", UserController.postSubscription)
user.get("/subscriptions/:id", UserController.getSubscription)
user.patch("/subscriptions/:id", UserController.updateSubscription)

user.get("/:id", UserController.getUserDetail)

module.exports = user