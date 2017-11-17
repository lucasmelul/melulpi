var Empresas = require('../models/empresas');
var Usuarios = require('../models/usuarios');
var Descuentos = require('../models/descuentos');
var DescuentosInstance = require('../models/descuentosinstance');
var _ = require('lodash');

var async = require('async');

exports.empresas_list = function(req, res, next){
	Empresas.find()
	.sort([['name', 'ascending']])
	.exec(function (err, list_empresas) {
		if (err) { return next(err); }
		res.json({empresas_list: list_empresas});
	});
};

exports.empresas_detail = function(req, res, next){

	async.parallel({
		empresas: function(callback) {

			Empresas.findById(req.params.id)
			.exec(callback);	
		},

		descuentos: function(callback){

		//	Descuentos.findById({ 'empresa' : req.params.id})
			Descuentos.find({'empresa' : req.params.id})
			.exec(callback);


		},
	}, function(err, results){
		if (err) {return next(err); }
		res.json({empresas_detail: results.empresas, descuentos: results.descuentos});
	});
};


exports.empresas_create = function(req, res, next){
	console.log(req.body);
	req.checkBody('name', 'Name must not be empty.').notEmpty();
	req.checkBody('country', 'Country must not be empty.').notEmpty();
	req.checkBody('state', 'State must not be empty.').notEmpty();
	req.checkBody('street', 'Street must not be empty.').notEmpty();
	req.checkBody('zipcode', 'Name must not be empty.').notEmpty();


	var empresas = new Empresas(
	{
		name: req.body.name,
		cuit:  (typeof req.body.cuit==='undefined') ? [] : req.body.cuit.split(","),
		country: req.body.country,
		state: req.body.state,
		street: req.body.street,
		zipcode: req.body.zipcode,
		loc:  (typeof req.body.loc==='undefined') ? [] : req.body.loc.split(",")
	});
	console.log('Empresa:' +empresas);

	var errors = req.validationErrors();
    if (errors) {
        console.log('ERRORS: '+errors);
        return next(err);
        }
        else {
        	empresas.save(function (err){
        		if (err) { return next(err); }
        		res.redirect(empresas.url);
        	});
        }

};

exports.empresas_delete = function(req, res, next){

	async.parallel({
		empresas: function(callback){
			Empresas.findById(req.params.id).exec(callback)
		},
		empresas_descuentos: function(callback) {
			Descuentos.find({ 'empresa': req.params.id }).exec(callback)			
		},
	}, function(err, results){
		if (err) { return next(err); }

		if (!results.empresas_descuentos.lenght) { //> 0) {
			Empresas.findByIdAndRemove(req.params.id, function deleteEmpresas(err){
				console.log(req.params.id);
				if (err) { return next (err); }
				res.redirect(303, '/empresas');
		});
	}
		else {
				res.json('empresas_delete', {title: 'Delete empresas', empresas: results.empresas, empresas_descuentos: results.empresas_descuentos} );
				return;
			}
		});
	};



exports.empresas_update = function(req, res, next){

	req.checkBody('name', 'Name must not be empty.').notEmpty();
	req.checkBody('country', 'Country must not be empty.').notEmpty();
	req.checkBody('state', 'State must not be empty.').notEmpty();
	req.checkBody('street', 'Street must not be empty.').notEmpty();
	req.checkBody('zipcode', 'Name must not be empty.').notEmpty();
	req.checkBody('loc', 'GeoLocation must not be empty.').notEmpty();

	var empresas = {
		name: req.body.name,
		cuit:  req.body.cuit,
		country: req.body.country,
		state: req.body.state,
		street: req.body.street,
		zipcode: req.body.zipcode
	};

	Empresas.findByIdAndUpdate(req.params.id, { $set: empresas }, function (err, empresa) {
		if (err) res.sendStatus(400);
		res.json(empresa);
	});
}

