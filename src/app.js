import express from 'express'
import path from 'path';
import hbs from 'hbs'
import geocode from './utils/geocode.js'
import forecast from './utils/forcast.js'


import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(path.join(__dirname,'../public'))
// console.log(__filename)

const app = express()

const publicDirectoryPath =path.join (__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebar
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static dir
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('view',{
        title :'Weather app' ,
        name :'binni kumari'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'binnii'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is text.',
        title: 'help',
        name :'binni kumari'
    })
})

app.get('/weather',(req, res)=>{
if(!req.query.address){
    return res.send({
        error:"you  must provide the address"
    })
}
geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
        return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
})
})

    // res.send({
    //     forcast :'its snowing',
    //     location :'tokyo',
    //     address: req.query.address
    // })
    

    app.get('/products',(req,res)=>{
      if(!req.query.search){
        return  res.send({
              error:"you mush provide a search term"})
      }

        console.log(req.query.search)
        res.send({
            products :[]
        })
    })

    app.get('/help/*', (req, res) => {
        res.render('404', {
            title: '404',
            name: 'binni',
            errorMessage: 'Help article not found.'
        })
    })
    
    app.get('*', (req, res) => {
        res.render('404', {
            title: '404',
            name: 'binni',
            errorMessage: 'Page not found.'
        })
    })





app.listen(3000, ()=>{
    console.log('server is up on post 3000')
})