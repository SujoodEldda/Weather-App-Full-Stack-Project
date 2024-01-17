class Weather{

    constructor(){
        this.data = []
    }

    async getCities(){
        this.data = await $.get(`weather/cities`)
        this.data.forEach(element => {element.isSaved = true})
        return this.data
    }

    async getCityData(name){
        const newData = await $.get(`weather/cities/${name}`)
        if(newData.error){
            alert(newData.error)
        }
        else if(!this.isCityInData(newData.name)){
            newData.isSaved = false
            this.data.push(newData)
        }
        return this.data
    }

    async saveCity(name){
        const newData = await $.post(`weather/cities/${name}`)
        if(newData.error)
            alert(newData.error)
        else
            newData.isSaved = true
        return this.data
    }

    async deleteCity(name){
        const newData = await $.ajax({
            url: `weather/cities/${name}`,
            type: 'DELETE',
          })
        this.data = this.data.filter(c => c.name !== newData.name)
        return this.data
    }

    isCityInData(cityName) {
        return this.data.some(existingCity => existingCity.name === cityName);
    }
}