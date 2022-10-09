const errHandler = (err, req, res, next) => {
    let code = 500;
    let message = "Internal server error";

    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        code = 400
        message = err.errors[0].message
    } else if (err.name === "invalid_email/pass") {
        code = 401
        message = "Invalid email/password"
    } else if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        code = 401
        message = "Invalid token"
    } else if (err.name === "Unauthorized") {
        code = 401
        message = "Unauthorized"
    } else if (err.name === "notfound") {
        code = 404
        message = "Data Not Found"
    }

    res.status(code).json({ message });
};

module.exports = errHandler