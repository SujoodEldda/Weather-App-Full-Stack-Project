const Weather = require('./model/weather')

const deleteData = async function(cityName){
    const deletedCity = await Weather.findOneAndDelete({ name: cityName })
    return deletedCity
}

const getData = async function(){
    const cities = await Weather.find({})
    return cities
}

const saveData = async function(city){
    const newCity = new Weather(city)
    newCity.save()
    return newCity
}
module.exports = {deleteData, getData, saveData}