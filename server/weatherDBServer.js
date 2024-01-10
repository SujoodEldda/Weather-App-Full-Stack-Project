const Weather = require('./model/weather')
const mongoose = require('mongoose')

class DBServer{
    
    connectToDB(){
        mongoose.connect("mongodb://127.0.0.1:27017/weather_DB")
            .catch((err)=> console.log(err))
    }

    async deleteData(cityName){
        const deletedCity = await Weather.findOneAndDelete({ name: cityName })
        return deletedCity
    }
    
    async getData(){
        const cities = await Weather.find({})
        return cities
    }
    
    async saveData(city){
        const newCity = new Weather(city)
        newCity.save()
        return newCity
    }

}

module.exports = DBServer