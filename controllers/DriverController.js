const {comparePassword} = require('../helpers/bcrypt');
const {signToken} = require('../helpers/jwt');
const { Driver, User, Subscription } = require('../models');

class DriverController {

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const findDriver = await Driver.findOne({ where: { email } })
            if (!findDriver) throw { message: "invalid_email/password" }
            const compare = comparePassword(password, findDriver.password)
            if (!compare) throw { message: "invalid_email/password" }
            const payload = { id: findDriver.id }
            const access_token = signToken(payload)
            res.status(200).json(findDriver)
        } catch (err) {
            next(err)
        }
    }

    static async updateBalance(req, res, next) {
        try {
            const { driverId } = req.params
            const { balance } = req.body
            const driver = await Driver.findByPk(driverId)
            if (!driver) throw { message: "notfound" }
            await Driver.update({ balance }, { where: { id: driverId } })
            res.status(200).json({ message: "success update driver balance with driver id: " + driverId })
        } catch (err) {
            next(err)
        }
    }

    static async getDrivers(req, res, next) {
        try {
            const drivers = await Driver.findAll()
            res.status(200).json(drivers)
        } catch (err) {
            next(err)
        }
    }

    static async getDetailDriver(req, res, next) {
        try {
            const { id } = req.params
            const driver = await Driver.findByPk(id)
            if (!driver) throw { message: "notfound" }
            res.status(200).json(driver)
        } catch (err) {
            next(err)
        }
    }

    static async getDetailChat(req, res, next) {
        try {
            const { id } = req.params
            console.log(id)
            const detailDriver = await Driver.findOne({
                where: { id },
                include: [{
                    model: Subscription,
                    include: [User]
                }]
            })
            if (!detailDriver) throw { message: "notfound" }
            res.status(200).json(detailDriver);
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
}

module.exports = {
    DriverController
};
