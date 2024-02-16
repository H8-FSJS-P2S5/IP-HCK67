const express = require("express");
const Controller = require("../controllers/controller");
const user = express.Router();

user.post("/register", Controller.register);
user.post("/google-login", Controller.googleLogin);
user.post("/login", Controller.login);

module.exports = user;
