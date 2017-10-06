var express = require('express');
var router = express.Router();

//Req Controllers
var empresas_controller = require('../controllers/empresasController');
var usuarios_controller = require('../controllers/usuariosController');
var descuentos_controller = require('../controllers/descuentosController');

//Routes 

// Rutas temporales hasta desarrollar router-parser para listar cateogria/geoloc

/* GET request for list usuarios */ 
router.get('/', descuentos_controller.descuentos_list);

/* POST request for creating usuarios */
router.post('/', descuentos_controller.descuentos_create);

module.exports = router;