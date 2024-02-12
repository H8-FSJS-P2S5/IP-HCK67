const express = require("express");
const errorHandler = require("../middlewares/errorHandler")
const user = require("./user");
const main = require("./main");

const router = express.Router();

router.use(user);
router.use(main);
router.use(errorHandler)

module.exports = router;
