const express = require('express')
const router = express.Router()
const weatherServer = require('../weatherApiServer')
const dbServer = require('../weatherDBServer')
const {noCityMess, noCityToAdd, noCities, CantDeleteMess} = require('../../config')

router.get('/cities/:name',async function(req,res){
    try{
        const city = await weatherServer.getData(req.params.name)
        res.send(city)
    }
    catch (error) {
        res.send({ error: noCityMess });
    }
})

router.post('/cities/:name', async function(req,res){
    try{
        const city = await weatherServer.addData(req.params.name)
        res.send(city)
    }
    catch (error) {
        res.send({ error: noCityToAdd });
    }
})

router.get('/cities', async function(req,res){
    try{
        const cities = await dbServer.getData()
        res.send(cities)
    }
    catch (error) {
        res.send({ error: noCities });
    }
})

router.delete('/cities/:name',async function(req,res){
    try{
        const deletedCity = await dbServer.deleteData(req.params.name)
        res.send(deletedCity)
    }
    catch (error) {
        res.send({ error: CantDeleteMess });
    }
})

module.exports = router