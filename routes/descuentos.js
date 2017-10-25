var express = require('express');
var router = express.Router();

//Req Controllers
var empresas_controller = require('../controllers/empresasController');
var usuarios_controller = require('../controllers/usuariosController');
var descuentos_controller = require('../controllers/descuentosController');

//Routes 

// Rutas temporales hasta desarrollar router-parser para listar cateogria/geoloc

/* GET request for list descuentos */ 
//router.get('/', descuentos_controller.descuentos_list);

/* Ruta con parse de query categ */

router.get('/', function(req, res, next){
	//var categ = request.query.categ 
	if (!req.query.categ) { 
		descuentos_controller.descuentos_list(req, res); 
	 } else {
	 	descuentos_controller.descuentos_list_categ(req, res);
	 	};
});


/* GET request for list descuentos detail */ 

router.get('/:id', descuentos_controller.descuentos_detail);

/* POST request for creating usuarios */
router.post('/', descuentos_controller.descuentos_create);

module.exports = router;