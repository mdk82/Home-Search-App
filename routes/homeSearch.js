"use strict";

const express = require('express');
const router = express.Router();
const request = require('request');

// Get response to root - render html
router.get('/', (req, res, next) => {
  res.render('index', { title: 'ZillowApp' });
});

// Post request to Zillow API
router.post('/homeSearch', (req, res, next) => {

    // console.log(req.body.address);
    // console.log(req.body.city);
    // console.log(req.body.state);
    // console.log(req.body.zipCode);

    //TODO: remove token and add in env variable
    let apiKey = "X1-ZWz1dyb53fdhjf_6jziz"
    let address = req.body.address.split(" ").join("+");
    let citystatezip = req.body.city.split(" ").join("+") + "+" + req.body.state.split(" ").join("+")
     + "+" + req.body.zipCode;

    let url = "http://www.zillow.com/webservice/GetSearchResults.htm?" +
        "zws-id="+apiKey+"&address="+address+"&citystatezip="+citystatezip;
    // Get response from API
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
