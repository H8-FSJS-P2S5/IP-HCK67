if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");

const cors = require("cors");
const router = require("./routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.get("/", (req, res) =>
  res.status(200).json({ message: "Server connected" })
);
app.use(router);

module.exports = app;
