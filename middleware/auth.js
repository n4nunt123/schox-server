const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authz(req, res, next) {
  try {
    let { access_token } = req.headers;
    if (!access_token) throw { name: "Unauthorized" };
    let payload = verifyToken(access_token);
    let user = await User.findByPk(payload.id);
    if (!user) throw { name: "Unauthorized" };
    req.user = { id: user.id };
    next();
  } catch (err) {
    console.log(err)
    next(err);
  }
  
}

module.exports = authz;