const express = require('express')
const router = express.Router()
const Weather = require('../model/weather')
const axios = require('axios');
const {apiUrl, apiKeyPhoto, unsplashApiUrl, changeDescription, noCityMess, noCityToAdd} = require('../../config')

router.get('/cities/:name',function(req,res){
    axios.get(apiUrl.replace('name',req.params.name))
    .then(response => {
        const {name,main, weather} = response.data
        const temperature = main.temp
        const weatherDescription = weather[0].description
        axios.get(unsplashApiUrl.replace(changeDescription,weatherDescription))
        .then(unsplashResponse => {
            const photoUrl = unsplashResponse.data.urls.regular
            const city = {name, temperature,condition: weatherDescription, conditionPic:photoUrl}
            res.send(city)
        })
    })
    .catch(error => {
        res.send({error:noCityMess})
    }) 
})

router.post('/cities/:name', function(req,res){
    axios.get(apiUrl.replace('name',req.params.name))
    .then(response => {
        const {name,main, weather} = response.data
        const temperature = main.temp
        const weatherDescription = weather[0].description
        axios.get(unsplashApiUrl.replace('weatherDescription',weatherDescription))
        .then(async unsplashResponse => {
            const photoUrl = unsplashResponse.data.urls.regular
            const city = {name, temperature,condition: weatherDescription, conditionPic:photoUrl}
            let saved = false
            const cities = await Weather.find({})
            cities.forEach((city)=>{
                 if(city.name==name)
                    saved = true
            })
            if(!saved){
                const newCity = new Weather(city)
                newCity.save()
                res.send(newCity)
            }
            else{
                res.send({error:noCityToAdd})
            }
        })
    })
    .catch(error => {
        res.status(404).send({error :error.message})
    })   
  
})

router.get('/cities', function(req,res){
    const cities = Weather.find({}).then((cities)=>{
        if(cities)
            res.send(cities)
        else
            res.send([])
    })
})

router.delete('/cities/:name',async function(req,res){
    const deletedCity = await Weather.findOneAndDelete({ name: req.params.name })
    res.send(deletedCity)
})

module.exports = router