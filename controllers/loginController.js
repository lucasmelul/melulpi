var Empresas = require('../models/empresas');
var Usuarios = require('../models/usuarios');
var Descuentos = require('../models/descuentos');
var DescuentosInstance = require('../models/descuentosinstance');

var VerifyToken = require('./VerifyToken');

var jwt = require('jsonwebtoken'); 
var bcrypt = require('bcryptjs');
var config = require('../config'); 


exports.login_post = function(req, res, next){

	Usuarios.findOne({ email: req.body.email }, function (err, usuario) {

 		if (err) return res.status(500).send('Error on the server.');
    	if (!usuario) return res.status(404).send('No user found.');
    
    	// check if the password is valid
    	var passwordIsValid = bcrypt.compareSync(req.body.password, usuario.password);
    
    	if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: usuario._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });


	});
};