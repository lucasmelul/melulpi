var express = require('express');
var router = express.Router();

//Req Controllers
var empresas_controller = require('../controllers/empresasController');
var usuarios_controller = require('../controllers/usuariosController');
var descuentos_controller = require('../controllers/descuentosController');

//Routes

/* GET request for list usuarios */
router.get('/', usuarios_controller.usuarios_list);

/* POST request for creating usuarios */
router.post('/', usuarios_controller.usuarios_create);

/* GET request for one usuarios */
router.get('/:id', usuarios_controller.usuarios_detail);


// Rutas temporales hasta tener el endpoint me terminado

router.get('/:id/descuentos', usuarios_controller.usuarios_list_descuentos);

//router.post('/usuarios/:id/descuentos', usuarios_controller.usuarios_buy_descuentos);

router.delete('/:id', usuarios_controller.usuarios_delete);

router.put('/:id', usuarios_controller.usuarios_update);


// Routes for me middleware -  Dummy Routes

router.get('/me', usuarios_controller.usuarios_me_list);

//router.put('/usuarios/me', usuarios_controller.usuarios_me_update);

router.get('/me/descuentos', usuarios_controller.usuarios_me_list_descuentos);

//router.post('/usuarios/me/descuentos', usuarios_controller.usuarios_me_buy_descuentos);


module.exports = router;