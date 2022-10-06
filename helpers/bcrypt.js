const { hashSync, compareSync } = require("bcryptjs");

const hashPassword = (password) => hashSync(password, 8);
const comparePassword = (notHashed, hashed) => compareSync(notHashed, hashed);

module.exports = {
    hashPassword,
    comparePassword,
};
