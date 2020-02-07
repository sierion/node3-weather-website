const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/0ae6fd23bd12b306cddfbb9ddc76a950/' + latitude + ',' + longitude + '?units=si'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to reach weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " it's currently " + body.currently.temperature + ' degrees out with a ' + body.currently.precipProbability * 100 + '% chance of rain.')
        }
    })
}

module.exports = forecast