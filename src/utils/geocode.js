import request from 'request'

const  geocode =(address ,callback)=>{

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)  +'.json?access_token=pk.eyJ1IjoiYnVubnl5IiwiYSI6ImNrdWRtcGMwNjB2aG4ycm10bXZ1Ymk2NnYifQ.0xJX7k2gWho-MU8Yw7RDmQ'
    //encodeURIComponent(address) 
    request ({ url,json :true},(error ,{ body })=>{
        if(error){
            callback('unable to connect to location services', undefined)
        }else if(body.features.length === 0){
            console.log(body.features.length);
            callback('unable to find the location, try anpther search' , undefined)
        }
        
        else{
            callback(undefined,
                {latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                  location:body.features[0].place_name})
        }

    })
}

export default geocode;