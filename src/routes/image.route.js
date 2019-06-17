const express = require('express');
const router = express.Router();
const jwt=require('jsonwebtoken');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../data/street-spectra.db');

router.post('/images', function(req, res) {
  console.log("Receiving image");
 res.send();
});

module.exports = router;
