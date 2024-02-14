const express = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentiocation");
const main = express.Router();

main.use(authentication);
main.get("/movies", Controller.getData);
main.get("/movies/:id", Controller.getDataById);
main.post("/movies/upgrate", Controller.payment);
main.get("/favorites", Controller.getFav);
main.post("/favorites/:id", Controller.addToFav);
main.delete("/favorites/delete/:id", Controller.deleteFav);
main.put("/users/status/:id", Controller.toPremium);
main.get("/users/status/premium/:id", Controller.premiumCheck);

module.exports = main;
