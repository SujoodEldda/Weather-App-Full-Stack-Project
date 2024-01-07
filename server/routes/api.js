const express = require('express')
const router = express.Router()
const weather = require('../model/weather')
const axios = require('axios');
const config = require('../../config')
const apiUrl = config.apiUrl
const apiKeyPhoto = config.apiKeyPhoto
const unsplashApiUrl = config.unsplashApiUrl

const cities = []

router.get('/data/:cityName', function (req, res) {
    axios.get(apiUrl.replace('name',req.params.cityName))
    .then(response => {
        const {name,main, weather} = response.data
        const temperature = main.temp
        const weatherDescription = weather[0].description
        axios.get(unsplashApiUrl.replace('weatherDescription',weatherDescription))
        .then(unsplashResponse => {
            const photoUrl = unsplashResponse.data.urls.regular
            const city = {name, temperature,condition: weatherDescription, conditionPic:photoUrl}
            cities.push(city)
            res.send(city)
        })
    })
    .catch(error => {
        res.status(404).send({'Error':error.message})
    })
})

router.post('/cities/:name', function(req,res){

    const wantedCity = cities.filter(c => c.name === req.params.name)
    const newCity = new weather(wantedCity[0])
    newCity.save()
    res.send(newCity)
  
})

router.get('/saved', async function(req,res){
    const cities = await weather.find({})
    if(cities)
        res.send(cities)
    else
        res.send({"mess":"no saved cities in DB!"})
})

router.get('/cities', function(req,res){
    res.send(cities)
})

router.delete('/cities/:cityName',function(req,res){
    weather.deleteOne({ name: req.params.cityName }).then(city=>{res.send(city)})
})

module.exports = router