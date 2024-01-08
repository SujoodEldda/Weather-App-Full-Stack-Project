const apiKey = '27aae1f54e754d7688f5b17d305ecb4a'
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=name&appid=${apiKey}`
const apiKeyPhoto = "T09HHh46ibTJNEW6xPNDnXPhwfBzehTzWQqQRl5W6RY"
const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=weatherDescription&client_id=${apiKeyPhoto}`
const changeDescription = "weatherDescription"
const noCityMess = "no city with such a name!"
const noCityToAdd = "no city to add"
const noCities = "there is no cities saved in the DB!"
const CantDeleteMess = "can not delete this city"
const alreadyAdded = "this city is already added!"
module.exports = {apiKey, apiUrl, apiKeyPhoto, unsplashApiUrl, changeDescription, noCityMess, noCityToAdd, noCities, CantDeleteMess, alreadyAdded}