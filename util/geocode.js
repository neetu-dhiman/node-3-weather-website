const request = require('postman-request');
const geocode  = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2hvYW5iYWRhNTUiLCJhIjoiY2s5eWQ0OTZrMG9mYjNubzhnbjc1dzY0eCJ9.Lx-MDMnICNAwKipfOf2ciQ&limit=1';
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2hvYW5iYWRhNTUiLCJhIjoiY2s5eWQ0OTZrMG9mYjNubzhnbjc1dzY0eCJ9.Lx-MDMnICNAwKipfOf2ciQ&limit=1';
    request({url: url, json: true }, (error, response, body) => {    
        if(error) {            
            callback(error, response);
        } else if(body ) {
            // console.log(body);
            callback(undefined, body.features[0].center);
        }
    });
}

module.exports=geocode;
