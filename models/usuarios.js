var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsuariosSchema = Schema(
	{
		email: {type: String, required: true, max: 50},
		first_name: {type: String, required: true, max: 20},
		family_name: {type: String, required: true, max: 20},
		dni: {type: Number, required: true},
		country: {type: String, required: true, max: 100},
		state: {type: String, required: true, max: 100},
		street: {type: String, required: true, max: 100},
		zipcode: {type: String, required: true, max: 100},
		loc: {type: [Number], index: '2d', required: false },
		date_of_birth: {type: Date},
	});

UsuariosSchema
.virtual('name')
.get(function () {
	return this.family_name + ',' + this.first_name ;
});


UsuariosSchema
.virtual('url')
.get(function () {
	return '/usuarios/'+this._id
});

/*
UsuariosSchema
.virtual('loc')
.get(function () {
	return this.loc;
});

*/

/*
UsuariosSchema
.virtual('email')
.get(function () {
	return this.email;
});
*/


//TODO Agregar funciones geo y varios

module.exports = mongoose.model('Usuarios', UsuariosSchema);