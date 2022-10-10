const {comparePassword} = require("../helpers/bcrypt");
const {signToken} = require("../helpers/jwt");
const { User, School, Subscription } = require("../models");
const { sequelize } = require("../models");

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
            console.log(err);
            next(err);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const findUser = await User.findOne({ where: { email } });
            if (!findUser) throw { message: "invalid_email/pass" }
            const compare = comparePassword(password, findUser.password)
            if (!compare) throw { message: "invalid_email/pass" }

            const payload = { id: findUser.id }
            const access_token = signToken(payload)

            res.status(200).json({access_token});
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

    // get all school

    static async getBalance(req, res, next) {
        try {
            const { userId } = req.params
            const findUser = await User.findByPk(userId)
            res.status(200).json({ balance: findUser.balance });
        } catch (err) {
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
        try {
            const { type, price, goHomeTime, toShoolTime, DriverId, SchoolId } = req.body
            const { id } = req.user
            let startDate = new Date()
            let endDate

            //TODO dayJS
            if (type == "weekly") endDate = endDate.setDate(startDate.getDate() + 7) // disini harusnya dipikirin gimana kalo ditengah subs ada hari minggu
            else if (type == "monthly") endDate = endDate.setDate(startDate.getDate() + 30)


            const createSubs = await Subscription({
                type, price, goHomeTime, toShoolTime, DriverId, SchoolId, startDate, endDate, 
                status: "active"
            }, { transaction: t })
            await User.update({ SubscriptionId: createSubs.id }, { where: { id }})

            t.commit();
            res.status(201).json({ message: "success create subscription " + createSubs.id });
        } catch (err) {
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
