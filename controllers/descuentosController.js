var Empresas = require('../models/empresas');
var Usuarios = require('../models/usuarios');
var Descuentos = require('../models/descuentos');
var DescuentosInstance = require('../models/descuentosinstance');


var async = require('async');


exports.descuentos_list = function(req, res, next){

	Descuentos.find({}, 'title description')
	.populate('title')
	.populate('description')
	.exec(function (err, list_descuentos) {
		if (err) { return next(err); }
		res.json('descuentos_list', {title: 'Listado de Descuentos', descuentos_list: list_descuentos});
	});
};

exports.descuentos_create = function(req, res, next){

	req.checkBody('title', 'Name must not be empty.').notEmpty();
	req.checkBody('description', 'Country must not be empty.').notEmpty();
	req.checkBody('empresa', 'State must not be empty.').notEmpty();
	req.checkBody('category', 'Street must not be empty.').notEmpty();
	req.checkBody('stock', 'Name must not be empty.').notEmpty();

	var descuentos = new descuentos(
	{
		title: req.body.title,
		description: req.body.description,
		empresa: req.body.empresa,
		category: req.body.category,
		stock: req.body.stock
	});
	console.log('descuentos:' +descuentos);

	var errors = req.validationErrors();
    if (errors) {
        return next(err);
        }
        else {
        	descuentos.save(function (err){
        		if (err) { return next(err); }
        		res.redirect(descuentos.url);
        	});
        }

};
