var express = require('express');
var router = express.Router();

//Req Controllers
var empresas_controller = require('../controllers/empresasController');
var usuarios_controller = require('../controllers/usuariosController');
var descuentos_controller = require('../controllers/descuentosController');

//Routes

/* GET request for list empresas */
router.get('/', empresas_controller.empresas_list);

/* GET request for one empresas */
router.get('/:id', empresas_controller.empresas_detail);

/* POST request for creating empresa */
router.post('/', empresas_controller.empresas_create);

/* DELETE request to delete empresa */
router.delete('/:id', empresas_controller.empresas_delete);

/* PUT request to update empresa */
router.put('/:id', empresas_controller.empresas_update);

module.exports = router;