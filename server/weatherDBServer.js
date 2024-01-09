const Weather = require('./model/weather')

class DBServer{

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