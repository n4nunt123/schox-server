const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Driver, User, Subscription } = require("../models");

class DriverController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const findDriver = await Driver.findOne({ where: { email } });
            if (!findDriver) throw { name: "invalid_email/password" };
            const compare = comparePassword(password, findDriver.password);
            if (!compare) throw { name: "invalid_email/password" };
            res.status(200).json(findDriver);
        } catch (err) {
            next(err);
        }
    }

    static async updateBalance(req, res, next) {
        try {
            const { driverId } = req.params;
            const { balance } = req.body;
            const driver = await Driver.findByPk(driverId);
            if (!driver) throw { name: "Drivers not found!" };
            await Driver.update({ balance }, { where: { id: driverId } });
            res.status(200).json({
                message:
                    "success update driver balance with driver id: " + driverId,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getDrivers(req, res, next) {
        try {
            const drivers = await Driver.findAll({
                where: { driverStatus: "Available" },
            });
            res.status(200).json(drivers);
        } catch (err) {
            next(err);
        }
    }

    static async getDetailDriver(req, res, next) {
        try {
            const { id } = req.params;
            const driver = await Driver.findByPk(id);
            if (!driver) throw { name: "Drivers not found!" };
            res.status(200).json(driver);
        } catch (err) {
            next(err);
        }
    }

    static async updateDriver(req, res, next) {
        try {
            const { id } = req.params;
            const { driverStatus } = req.body;
            const findDriver = await Driver.findOne({ where: { id } });
            if (!findDriver) throw { name: "Drivers not found!" };
            await Driver.update({ driverStatus }, { where: { id } });
            res.status(200).json({ message: "success update status driver" });
        } catch (err) {
            next(err);
        }
    }

    static async getDetailChat(req, res, next) {
        try {
            const { id } = req.params;
            const detailDriver = await Driver.findOne({
                where: { id },
                include: [
                    {
                        model: Subscription,
                        include: [User],
                    },
                ],
            });
            if (!detailDriver) throw { name: "Drivers not found!" };
            res.status(200).json(detailDriver);
        } catch (err) {
            next(err);
        }
    }

    static async checkSubscription(req, res, next) {
        try {
            const { driverId } = req.params;
            const checkSubs = await Subscription.findOne({
                where: { DriverId: driverId, status: "active" },
            });
            if (!checkSubs) throw { name: "NOT_BOOKED_YET" };
            const user = await User.findOne({ where: { SubscriptionId: checkSubs.id } })
            if(!user) throw { name: 'notfound' }
            else {
              res.status(200).json({
                  message: "BOOKED",
                  subsDetail: {goHomeTime: checkSubs.goHomeTime, toShoolTime: checkSubs.toShoolTime},
                  user: user
              });
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    DriverController,
};
