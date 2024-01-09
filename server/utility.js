const isSaved = function(cityName, cities){
    let saved = false
    cities.forEach((city)=>{
        if(city.name==cityName)
            saved = true
    })
    return saved
}

module.exports = {isSaved}