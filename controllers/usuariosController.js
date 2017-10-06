var Empresas = require('../models/empresas');
var Usuarios = require('../models/usuarios');
var Descuentos = require('../models/descuentos');
var DescuentosInstance = require('../models/descuentosinstance');

var async = require('async');

exports.usuarios_list = function(req, res, next){

	Usuarios.find()
	.sort([['family_name', 'ascending']])
	.exec(function (err, list_usuarios) {
		if (err) { return next(err); }
		res.json('usuarios_list', {title: 'Listado de Usarios', usuarios_list: list_usuarios});
	});
};

exports.usuarios_detail = function(req, res, next){

	async.parallel({
		usuarios: function(callback) {

			Usuarios.findById(req.params.id)
			.exec(callback);	
		},

		descuentos_usuarios: function(callback){

			DescuentosInstance.find({ 'usuarios': req.params.id}, 'title description')
			.exec(callback);
		},
	}, function(err, results){
		if (err) {return next(err); }
		res.json('usuarios_detail', {title: 'Usuarios Detail', usuarios: results.usuarios, descuentosinstance: results.descuentos_usuarios } );
	});
};

exports.usuarios_list_descuentos = function(req, res, next){

	async.parallel({
		usuarios: function(callback){

			Usuarios.findById(req.params.id)
			.populate('email')	
			.exec(callback);
			},
			descuentosinstance: function(callback) {

				DescuentosInstance.find({ 'usuarios': req.params.id})
				.exec(callback);
			},
		}, function(err, results){
			if (err) { return next(err); }
			res.json('usuarios_list', {title: 'Listado de Usarios y descuentos', usuarios: results.usuarios, descuentos: results.descuentosinstance});
	});
}


exports.usuarios_create = function(req, res, next){

	req.checkBody('email', 'Name must not be empty.').notEmpty();
	req.checkBody('first_name', 'Country must not be empty.').notEmpty();
	req.checkBody('family_name', 'State must not be empty.').notEmpty();
	req.checkBody('dni', 'Street must not be empty.').notEmpty();
	req.checkBody('country', 'Name must not be empty.').notEmpty();
	req.checkBody('state', 'GeoLocation must not be empty.').notEmpty();
	req.checkBody('street', 'GeoLocation must not be empty.').notEmpty();
	req.checkBody('zipcode', 'GeoLocation must not be empty.').notEmpty();
	req.checkBody('date_of_birth', 'GeoLocation must not be empty.').notEmpty();

	var usuarios = new Usuarios(
	{
		email: req.body.email,
		first_name: req.body.first_name,
		family_name: req.body.family_name,
		dni: req.body.dni,
		country: req.body.country,
		state: req.body.state,
		street: req.body.street,
		zipcode: req.body.zipcode,
		loc:  (typeof req.body.loc==='undefined') ? [] : req.body.loc.split(","),
		date_of_birth: req.body.date_of_birth
	});
	console.log('Usuarios:', usuarios);

	var errors = req.validationErrors();
    if (errors) {
        console.log('ERRORS: ', errors);
        }
        else {
        	usuarios.save(function (err){
        		if (err) { return next(err); }
        		res.redirect(usuarios.url);
        	});
        }

};

exports.usuarios_delete = function(req, res, next) { 
		Usuarios.findByIdAndRemove(req.body.id, function deleteUsarios(err) {
			if (err) {return next(err); }
			res.redirect('/usuarios')
		});
	}; 

		/* TODO: Eliminar descuentos 'me' 
		usuarios: function(callback){
			Usuarios.findById(req.params.id).exec(callback)
		},
		usuarios_descuentos: function(callback) {
			DescuentosInstance.find({ 'usuarios': req.params.id }).exec(callback)			
		},
	}, function(err, results){
		if (err) { return next(err); }

		if (results.usuarios_descuentos.lenght > 0 {
			res.json('usuarios_delete', {title: 'Delete usuarios', usuarios: results.usuarios, usuarios_descuentos: results.usuarios_descuentos}
				return;

		}
		else { 
			Usuarios.findByIdAndRemove(req.body.usuariosid, function deleteUsuarios(err){
				if (err) { return next (err); }
				res.redirect('/usuarios')
			})
		};
*/

exports.usuarios_update = function(req, res, next){


	req.checkBody('email', 'Name must not be empty.').notEmpty();
	req.checkBody('first_name', 'Country must not be empty.').notEmpty();
	req.checkBody('family_name', 'State must not be empty.').notEmpty();
	req.checkBody('dni', 'Street must not be empty.').notEmpty();
	req.checkBody('country', 'Name must not be empty.').notEmpty();
	req.checkBody('state', 'GeoLocation must not be empty.').notEmpty();
	req.checkBody('street', 'GeoLocation must not be empty.').notEmpty();
	req.checkBody('zipcode', 'GeoLocation must not be empty.').notEmpty();
	req.checkBody('date_of_birth', 'GeoLocation must not be empty.').notEmpty();

    var errors = req.validationErrors();

	var usuarios = new Usuarios(
	{
		email: req.body.email,
		first_name: req.body.first_name,
		family_name: req.body.family_name,
		dni: req.body.dni,
		country: req.body.country,
		state: req.body.state,
		street: req.body.street,
		zipcode: req.body.zipcode,
		loc:  (typeof req.body.loc==='undefined') ? [] : req.body.loc.split(","),
		date_of_birth: req.body.date_of_birth,
		_id: req.params.id
	});

	if (errors) {
		res.json('usuarios_update', {title: 'Update Usuarios', usuarios: usuarios, errors: errors});
		return;
	}
	else {
       	Usuarios.findByIdAndUpdate(req.params.id, usuarios, {}, function(err, elusuario){
        		if (err) { return next(err); }
        		res.redirect(elusuario.url);
        	});
        }
};





exports.usuarios_me_list = function(req, res, next){

	res.json('dummy test', {title: 'dummy test'});
};

exports.usuarios_me_update = function(req, res, next){

	res.json('dummy test', {title: 'dummy test'});
};

exports.usuarios_me_list_descuentos = function(req, res, next){

	res.json('dummy test', {title: 'dummy test'});
};

exports.usuarios_me_buy_descuentos = function(req, res, next){

	res.json('dummy test', {title: 'dummy test'});
};


