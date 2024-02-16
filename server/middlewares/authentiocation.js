const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    // console.log(req.headers, "req heade authen");
    let access_token = req.headers.authorization;
    console.log(access_token, "authen <><>>>");

    if (!access_token) {
      console.log("authen 1 ##");
      throw { name: "InvalidToken" };
    }

    if (access_token.slice(0, 7) !== "Bearer ") {
      console.log("authen 2 %%%%");
      throw { name: "InvalidToken" };
    }

    access_token = access_token.slice(7);
    let payload = verifyToken(access_token);
    // console.log(access_token, "authen");

    let user = await User.findByPk(payload.id);
    // console.log(user,"user");

    if (!user) {
      console.log("authen 3 ++++++");
      throw { name: "InvalidToken" };
    }

    req.user = { id: user.id };
    // console.log(req.user);

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "InvalidToken" || error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "InvalidToken" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = authentication;
