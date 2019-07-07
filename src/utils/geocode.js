const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWR2aXQxMjMiLCJhIjoiY2p3N3llZDc2Mmp0MzQwbW11YXJib3V4ZSJ9.zdPZnn2y58OnupGIGPcDEA&limit=1'
    request({'url':url,'json':true},(error,response)=>{
        if(error){
            callback('Unable to connect to location service',undefined);
        }
        else if(response.body.features.length ==0){
            callback('Unable to find location, please search again',undefined);
        }
        else{
            callback(undefined,{
                'latitude':response.body.features[0].center[1],
                'longitude':response.body.features[0].center[0],
                'location':response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;