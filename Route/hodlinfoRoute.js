const path = require('path');
const express = require('express');
const router = express.Router();
// const CryptoPrice = require('../Model/hodlinfoModel'); 
const ControllerFile = require('../Controllers/hodlinfController')


console.log('jsbdksadn')


router.get('/get-and-format-data', ControllerFile.fetchAndSendCryptoData)



module.exports = router;
