const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../util/geocode');
const forecast = require('../util/forecast');
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewDirectoryPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlers engine and views location
app.set('view engine', 'hbs');
app.set('views', viewDirectoryPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Meet'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Meet'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Meet'
    });
});

// app.get('/about', (req, res) => {
//     res.send('<h1> About Us Page</h1>');
// });

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'Please provide a address.'
        });
        return;
    }
    geocode(req.query.address, (error, response) => {
        if(error) {
            res.send({
                error: 'No response'
            });
            return;
        } else {
            
            // res.send(response);
            // return;
            // console.log(response)
            forecast(response, (error, response) => {
                if(error) {
                    res.send({
                        error: error
                    });
                    return;
                } else {
                    let result = {
                        city: response.location.name,
                        temperature: response.current.temperature,
                        weather_descriptions: response.current.weather_descriptions[0]

                    }
                    res.send(result);
                }
            });
        }
    });
});

app.get('*', (req, res) => {
    res.render('404');
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});
