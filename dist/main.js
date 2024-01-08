const weather = new Weather()
const render = new Renderer()

const showData = async function(){
    const cities = await weather.getCities()
    render.weatherRender(cities)
}

searchCity.on('click',async function(){
    const name = cityName.val()
    const cities = await weather.getCityData(name)
    render.weatherRender(cities)
})

weatherContainer.on("click","#add",async function(){
    const className  = $(this).attr('class')
    if(className==plusIcon){
        $(this).toggleClass(minusIcon)
        const cityName = $(this).next('div').attr('id')
        weather.saveCity(cityName)
    }
    else{
        const cityName = $(this).next('div').attr('id')
        const cities = await weather.deleteCity(cityName)
        render.weatherRender(cities)
    }
})

refresh.on("click",function(){
    showData()
})

showData()