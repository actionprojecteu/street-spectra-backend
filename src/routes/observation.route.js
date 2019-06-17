const express = require('express');
const router = express.Router();
const jwt=require('jsonwebtoken');
let config = require('../../config/config.js');

var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('../street-spectra.db');

router.post('/observations', function(req, res) {
  console.log("Receiving observation");
  console.log("Tamaño:"+Object.keys(req.body));

  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  console.log('req.files >>>', req.files);
  var coordinates = JSON.stringify(req.body);
  var latitude = req.body["latitude"];
  var longitude = req.body["longitude"];

  console.log(latitude+" "+longitude);


  const usertoken = req.headers.authorization;
  const token = usertoken.split(' ');
  //var username = jwt.verify(token[1], 'idonotknowwhattalkingaboutyou');
  var username = jwt.verify(token[1], config.secret);
  console.log("Username:"+username.usuario);

  var tstamp = req.body["tstamp"];
  console.log("Timestamp:"+tstamp);

  var currentTime = new Date().getTime();

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.camera_spectra;
  let spectraFile = req.files.camera_spectra.name+"-"+currentTime+".jpg";

  console.log("File created:"+spectraFile);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/tmp/'+spectraFile, function(err) {
    if (err)
      return res.status(500).send(err);

      // insert one row into the langs table
    db.run(`INSERT INTO observations(user,latitude,longitude,tstamp,image) VALUES(?,?,?,?,?)`, [username.usuario,latitude,longitude,tstamp,spectraFile], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    res.send('File uploaded!');
  });

});

module.exports = router;
