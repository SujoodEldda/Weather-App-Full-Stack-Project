const express = require('express')
const app = express()
const api = require('./server/routes/weather-api')
const path = require('path')
const dbManager = require("./server/weatherDBServer")

const dbServer = new dbManager()
dbServer.connectToDB()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/weather', api)

const port = 80
app.listen(process.env.PORT || port, function () {
    console.log(`Running on port ${port}`)
})