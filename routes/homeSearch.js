const express = require('express');
const router = express.Router();
const request = require('request');

// Get response to root - render html
router.get('/', (req, res, next) => {
  res.render('index', { title: 'ZillowAppp' });
});

router.post('/homeSearch', (req, res, next) => {
    let apiKey = "X1-ZWz1dyb53fdhjf_6jziz";
    let address = req.body.address.split(" ").join("+");
    let citystatezip = req.body.city.split(" ").join("+") + "+" + req.body.state.split(" ").join("+")
     + "+" + req.body.zipCode;

    let url = "http://www.zillow.com/webservice/GetSearchResults.htm?" +
        "zws-id="+apiKey+"&address="+address+"&citystatezip="+citystatezip;
        
    request(
        { method: 'GET'
            , url: url
        }
        , function (error, response, body) {
            if(error){
                res.status(500).send({"data":error});
            }
            res.status(200).send({"data":body});
        }
    )
});
module.exports = router;
