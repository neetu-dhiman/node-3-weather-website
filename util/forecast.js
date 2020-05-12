const request = require('postman-request');
const forecast = ([longitude, latitude], callback) => {
    let url = 'http://api.weatherstack.com/current?access_key=5f5317ce843626599fc71359c6fb045b&query='+ 
    latitude+','+longitude;

    console.log(longitude+','+latitude);
    // url = 'http://api.weatherstack.com/current?access_key=5f5317ce843626599fc71359c6fb045b&query=34.0544,-118.2439';
    // const url = 'https://randomuser.me/api/';
    request({url, json: true }, (error, response, body) => {
        if(error) {
            callback(error, response);
        } else if (response) {
            // console.log(response);
            callback('', body);
        }
    });
};

module.exports=forecast;