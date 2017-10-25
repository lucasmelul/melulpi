var express = require('express');
var router = express.Router();

//Req Controllers
var empresas_controller = require('../controllers/empresasController');
var usuarios_controller = require('../controllers/usuariosController');
var descuentos_controller = require('../controllers/descuentosController');
var login_controller = require('../controllers/loginController');


router.post('/', login_controller.login_post);

module.exports = router;