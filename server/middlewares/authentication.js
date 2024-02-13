const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = async function authentication(req, res, next) {
    let access_token = req.headers.authorization
    try {
        console.log(access_token);
        if (!access_token) throw {name: "Invalid Token"}
        let [bearer, token] = access_token.split(" ")


        if (bearer !== "Bearer") throw {name: "Invalid Token"}
        let payload = verifyToken(token)
        let user = await User.findByPk(payload.id)
        if (!user) throw {name: "Invalid Token"}

        req.user = {
            id: user.id,
            email: user.email
        }
        next()
    } catch (error) {
        next(error)
    }
}