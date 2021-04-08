const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

const app = express()

//Define Paths for express config
const publicDirectory  = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

// Set up handle bars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))


app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather',
        name:'Lucifer Morningstar'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About',
        name:'Lucifer Morningstar'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message:'This is some helpful text',
        title:'Help',
        name:'Lucifer Morningstar'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a address term'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast:forecastData,
                location, 
                address:req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        errorMessage:'Help article not found',
        title:'404',
        name:'Lucifer Morningstar'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        errorMessage:'404 page not found',  
        title:'404',
        name:'Lucifer Morningstar'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})

