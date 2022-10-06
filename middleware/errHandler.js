const errHandler = (err, req, res, next) => {
    let code = 500;
    let message = "Internal server error";

    res.status(code).json({ message });
};

module.exports = errHandler