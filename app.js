//require("dotenv").config();

const express = require('express')
const routes = require('./router')
const app = express()
const port = 3000
const cors = require('cors')


app.use(cors())
app.use(express.urlencoded({extended : true}));
app.use(express.json()) // parse from JSON

app.use('/', routes)



app.listen(port, () => {
  console.log(`Hello World! IP-HCK-67 App on Port ${port}`)
})


