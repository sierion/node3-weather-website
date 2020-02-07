const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Jonathan'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Jonathan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help page',
        msg: 'Some help message',
        name: 'Jonathan'
    })
})

app.get('',(req, res) => {
    res.send('<h1>Title</h1>')
})


app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: "No address entered"
        })
    } 
        
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
            if(error){
                return res.send({
                    error
                })
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
        
                if(error){
                    return res.send({
                        error
                    })
                }
    
                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                })
    
              })
        })

    

    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Help page',
        msg: 'Article not found',
        name: 'Jonathan'
    })
})

app.get('/products', (req, res)=>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide search'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'Not found',
        msg: 'Page not found',
        name: 'Jonathan'
    })
})

app.listen(3000, () => {
    console.log('Server is up in port 3000')
})