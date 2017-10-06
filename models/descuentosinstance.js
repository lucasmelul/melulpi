var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var DescuentosInstanceSchema = Schema({
	decuento: {type: Schema.ObjectId, ref: 'Descuentos', required: true},
	usuario: {type: Schema.ObjectId, ref: 'Usuarios', required: true},
	status: {type: String, required: true, enum:['Disponible', 'Utilizado'], default: 'Disponible'},
	buy_date: {type: Date, default: Date.now}
});

DescuentosInstanceSchema
.virtual('url')
.get(function () {
	return '/usuarios/me/descuentos/'+this._id;
});

DescuentosInstanceSchema
.virtual('buy_date_formatted')
.get(function () {
	return moment(this.buy_date).format('YYYY-MM-DD');
});

module.exports = mongoose.model('DescuentosInstance', DescuentosInstanceSchema);