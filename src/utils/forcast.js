import request from 'request'

const forecast =(latitude , longitude ,callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=9de594b1399a7cb99592d1b90db79c55&query='+ latitude +','+ longitude
     
    request({url :url ,json :true}, (error , {body})=>{
        if(error){
             callback('unable to connect  to weather  service',undefined)
        }
        else if(body.error){
            
                callback('not able to find location', undefined)
                // console.log(response.body.error)
        }else
        {
           callback(undefined ,body.location.name +'  its is currently ' + body.current.weather_code +' wheather code')
        }
    })
}

export default forecast;