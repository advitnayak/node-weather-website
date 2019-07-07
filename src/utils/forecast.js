const request = require('request')

const forecast = (coordinates,callback)=>{
    const url = 'https://api.darksky.net/forecast/96f0786bf025dc2dbfa3dbfd155d9ee8/'+coordinates.latitude+','+coordinates.longitude;//+'?units=auto';
    request({'url':url,'json':true},(error,response)=>{
        if(error){
            callback('Could not connect to network',undefined);
        }
        else if(response.body.error){
            callback('Please provide valid url',undefined);
        }
        else{
            celsius = ((response.body.currently.temperature - 32)*(5/9)).toFixed(2)
            callback(undefined,"Current temperature is "+celsius+" degress out. There is "+response.body.currently.precipProbability+"% chance of rain")
        }
    })
}

module.exports = forecast;