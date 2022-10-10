const {comparePassword} = require("../helpers/bcrypt");
const {signToken} = require("../helpers/jwt");
const { User, School, Subscription } = require("../models");
const { sequelize } = require("../models");
const moment = require('moment')
const business = require('moment-business');

class UserController {
    static async register(req, res, next) {
        try {
            const {
                fullName,
                email,
                password,
                phoneNumber,
                address,
                latitude,
                longitude,
                childrenName,
            } = req.body;

            const createUser = await User.create({
                fullName,
                email,
                password,
                phoneNumber,
                address,
                latitude,
                longitude,
                childrenName,
                balance: 0,
            });
            res.status(201).json({
                id: createUser.id,
                email: createUser.email,
            });
        } catch (err) {
            next(err);
        }
    }
    static async login(req, res, next) {
        try {
            console.log()
            const { email, password } = req.body;
            const findUser = await User.findOne({ where: { email } });
            if (!findUser) throw { name: "invalid_email/pass" }
            const compare = comparePassword(password, findUser.password)
            if (!compare) throw { name: "invalid_email/pass" }

            const payload = { id: findUser.id }
            const access_token = signToken(payload)

            res.status(200).json({access_token: access_token, id: findUser.id});
        } catch (err) {
            next(err);
        }
    }

    static async postSchool(req, res, next) {
        try {
            const { name, latitude, longitude, address } = req.body
            await School.create({ name, latitude, longitude, address })
            res.status(201).json({message: "success create school"})
        } catch (err) {
            next(err)
        }
    }

    static async getSchools(req, res, next) {
        try {
            const schools = await School.findAll()
            res.status(200).json(schools)
        } catch (err) {
            next(err)
        }
    }

    static async getBalance(req, res, next) {
        try {
            const { userId } = req.params
            const findUser = await User.findByPk(userId)
            res.status(200).json({ balance: findUser.balance });
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
    static async updateBalance(req, res, next) {
        try {
            const { userId } = req.params
            const { balance } = req.body
            await User.update({balance}, {where: { id: userId }})
            res.status(201).json({ message: "success update balance with user id: " + userId });
        } catch (err) {
            next(err);
        }
    }

    static async postSubscription(req, res, next) {
        const t = await sequelize.transaction();
        const today = moment()
        try {
            const { type, price, goHomeTime, toShoolTime, DriverId, SchoolId } = req.body
            const { id } = req.user
            let startDate = new Date()
            // let currtDate = new Date()
            let endDate = new Date()

            if (type == "weekly") endDate = new Date(business.addWeekDays(today, 7));
            else if (type == "monthly") endDate = new Date(business.addWeekDays(today, 30));


            const createSubs = await Subscription.create({
                type, price, goHomeTime, toShoolTime, DriverId, SchoolId, startDate, endDate, 
                status: "active"
            }, { transaction: t })
            await User.update({ SubscriptionId: createSubs.id }, { where: { id }})

            t.commit();
            res.status(201).json({ message: "success create subscription " + createSubs.id });
        } catch (err) {
            console.log(err)
            t.rollback()
            next(err);
        }
    }
    static async getSubscription(req, res, next) {
        try {
            const { id } = req.params
            const detailSubs = await Subscription.findByPk(id)
            if (!detailSubs) throw { message: "notfound" }
            res.status(200).json(detailSubs);
        } catch (err) {
            next(err);
        }
    }
    static async updateSubscription(req, res, next) {
        try {
            res.status(201).json({ message: "updateSubscription" });
        } catch (err) {
            next(err);
        }
    }

    static async getUserDetail(req, res, next) {
        try {
            const { id } = req.params
            const detailUser = await User.findByPk(id)
            if (!detailUser) throw { message: "notfound" }
            res.status(200).json(detailUser);
        } catch (err) {
            console.log(err)
            next(err);
        }
    }

    // static async updateUser(req, res, next) {
    //     try {
    //         const { id } = req.params
    //         const { SubscriptionId } = req.body
    //         await User.update({ SubscriptionId }, { where: { id }})
    //         res.status(200).json({ message: "success update user" })
    //     } catch (err) {
    //         next(err)
    //     }
    // }
}

module.exports = UserController;
