var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmpresasSchema = Schema(
	{
		name: {type: String, required: true, max: 100},
		cuit: {type: String, required: false, max: 100 },
		country: {type: String, required: true, max: 100},
		state: {type: String, required: true, max: 100},
		street: {type: String, required: true, max: 100},
		zipcode: {type: String, required: true, max: 100},
		loc: {type: [Number], index: '2d', required: false }
	});


EmpresasSchema
.virtual('url')
.get(function () {
	return '/empresas/'+this._id
});

/*
EmpresasSchema
.virtual('loc')
.get(function () {
	return this.loc;
});


EmpresasSchema
.virtual('name')
.get(function () {
	return this.name;
});

*/

//TODO Agregar funciones geo y varios

module.exports = mongoose.model('Empresas', EmpresasSchema);