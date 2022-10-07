class DriverController {

    static async login(req, res, next) {
        try {
            res.status(201).json("login")
        } catch (err) {
            next(err)
        }
    }
}

module.exports = {
    DriverController
};
