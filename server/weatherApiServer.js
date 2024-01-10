const axios = require('axios')
const cityWeather = require('./model/cityWeather')
const DBServer = require("./weatherDBServer")
const utility = require("./utility")
require('dotenv').config()
const {apiUrl, unsplashApiUrl, changeDescription, alreadyAdded} = process.env

const dbServer = new DBServer()
class weatherAPIServer{

    async getData(cityName){
        const cities = await axios.get(apiUrl.replace('name',cityName))
        const {name, main, weather} = cities.data
        const temperature = main.temp
        const weatherDescription = weather[0].description
        const photo = await axios.get(unsplashApiUrl.replace(changeDescription,weatherDescription))
        const photoUrl = photo.data.urls.regular
        const city = new cityWeather(name, temperature, weatherDescription, photoUrl)
        return city   
    }
    
    async addData(cityName){
        const city = await this.getData(cityName)
        let saved = false
        try{
            const cities = await dbServer.getData()
            if(!utility.isSaved(cityName, cities)){
                const newCity =await dbServer.saveData(city)
                return newCity
            }
            return { error: alreadyAdded }
        }
        catch(error){
            return { error: alreadyAdded }
        }
    }

}

module.exports = weatherAPIServer
