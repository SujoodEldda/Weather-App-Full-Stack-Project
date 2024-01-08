class Renderer {
    weatherRender(data){
        weatherContainer.empty()
        for(let city of data){
            let source = weatherTemplate.html()
            let template = Handlebars.compile(source)
            let HTMLToAdd = template(city)
            weatherContainer.append(HTMLToAdd)
        }  
    }
}