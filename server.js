const express = require('express')
const app = express()
const api = require('./server/routes/api')
var weather = require("./server/model/weather")


const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/weather_DB").catch((err)=> console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', api)

const port = 3000
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})