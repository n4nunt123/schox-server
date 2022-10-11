const { sign, verify } = require("jsonwebtoken");

const signToken = (payload) => sign(payload, process.env.JWT_TOKEN);
const verifyToken = (token) => verify(token, process.env.JWT_TOKEN);

module.exports = {
  signToken,
  verifyToken,
};
