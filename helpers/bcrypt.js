const bcrypt = require("bcryptjs")

const hashPass = (plainPass) => {
    return bcrypt.hashSync(plainPass, bcrypt.genSaltSync(8))
}

const comparePass = (plainPass, hashPass) => {
    return bcrypt.compareSync(plainPass, hashPass)
}

module.exports = {hashPass, comparePass}