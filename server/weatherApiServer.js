const axios = require('axios')
const cityWeather = require('./model/cityWeather')
const dbServer = require('./weatherDBServer')
const {apiUrl, apiKeyPhoto, unsplashApiUrl, changeDescription, alreadyAdded} = require('../config')

const getData = async function(cityName){
    const cities = await axios.get(apiUrl.replace('name',cityName))
    const {name, main, weather} = cities.data
    const temperature = main.temp
    const weatherDescription = weather[0].description
    const photo = await axios.get(unsplashApiUrl.replace(changeDescription,weatherDescription))
    const photoUrl = photo.data.urls.regular
    const city = new cityWeather(name, temperature, weatherDescription, photoUrl)
    return city   
}

const addData = async function(cityName){
    const city = await getData(cityName)
    let saved = false
    try{
        const cities = await dbServer.getData()
        cities.forEach((city)=>{
            if(city.name==cityName)
                saved = true
        })
        if(!saved){
            const newCity = dbServer.saveData(city)
            return newCity
        }
        return { error: alreadyAdded }
    }
    catch(error){
        return { error: alreadyAdded }
    }
}

module.exports = {getData, addData}
