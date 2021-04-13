const request = require("request")


const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=4a45032b83eb24f86d860fbf20b4df95&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'
    request({json:true, url}, (error, {body})=>{
        if(error){
            callback('some low level error!', undefined)
        }else if(body.error){
            callback('Coordinates incorrect/not found', undefined)
        }else{
            const str = body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees celsius and feels like '+body.current.feelslike+' degrees celsius.'
            const str2='The Humidity is '+body.current.humidity+'%'
            callback(undefined, str+str2)
        }
    })
}
module.exports = forecast
