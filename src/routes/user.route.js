const express = require('express');
const router = express.Router();
const jwt=require('jsonwebtoken');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../data/street-spectra.db');

var jwtClave="idonotknowwhattalkingaboutyou";

var usuario= {
 nombre:"cecilio",
 clave:"cecilio"
}

router.post("/login",function(request,response) {

  console.log("LOGIN");

  console.log(request.body.nombre);

if (request.body.nombre==usuario.nombre || request.body.clave==usuario.clave) {

 var token=jwt.sign({
 usuario:"cecilio"
 },jwtClave);

 response.send(token);

}else {

 response.status(401).end("usuario incorrecto")
}

});

module.exports = router;
