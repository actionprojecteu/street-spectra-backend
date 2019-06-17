const express = require('express');
const bodyParser=require('body-parser');
const jwt=require('jsonwebtoken');
const expressJwt=require('express-jwt');
const cors = require('cors');
const fileUpload = require('../node_modules/express-fileupload/lib/index');
let config = require('../config/config.js');

var app = express();

var jwtClave=config.secret;

var noticias = [{
 id: 1,
 titulo: "noticia 1"
}];

//app.use(express.static('publica'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(fileUpload());

app.use(cors());

app.use(expressJwt({secret:jwtClave}).unless({path: ["/login", "/observations","/upload"]}));

app.post('/login', require('./routes/user.route'));

app.post('/images', require('./routes/image.route'));

app.post('/observations', require('./routes/observation.route'));

app.get('/noticias', function(req, res) {
 res.send(noticias);
});

/*
app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = '/tmp/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded to ' + uploadPath);
  });
});
*/

app.listen(8081, function() {
 console.log('aplicacion en el puerto 8081!');
});
