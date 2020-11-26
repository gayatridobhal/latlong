const request = require('request'); 
var ACCESS_TOKEN = 'pk.eyJ1IjoiZ2F5YXRyaWRvYmhhbCIsImEiOiJja2h3eHNhMngwZTZ5MnptcDV2YjV1MXd4In0.QkAm8VleUa5LkjL-8Jn75g'; 

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

var router = express.Router();

router.post("", (req, res) => {

    var address = req.body.address;
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
            + encodeURIComponent(address) + '.json?access_token='
            + ACCESS_TOKEN + '&limit=1'; 
  
    request({ url: url, json: true }, function (error, response) { 
        if (error) { 
            callback('Unable to connect to Geocode API', undefined); 
            res.json({
                Error: 'Unable to connect to Geocode API'
            });
        } else if (response.body.features.length == 0) { 
            callback('Unable to find location. Try to '
                     + 'search another location.'); 
            res.json({
                Error: 'Unable to find location. Try to search another location.'
            });
        } else { 
            var longitude = response.body.features[0].center[0] 
            var latitude = response.body.features[0].center[1] 
            var location = response.body.features[0].place_name 
  
            console.log("Latitude :", latitude); 
            console.log("Longitude :", longitude); 
            console.log("Location :", location); 

            res.json({
                Latitude: latitude,
                Longitude: longitude,
                Location: location
            });
        } 
    })       
})

app.use("", router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
