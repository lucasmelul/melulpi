var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DescuentosSchema = Schema(
	{
		title: {type: String, required: true, max: 100},
		description:  {type: String, required: true, max: 200},
		empresa: {type: Schema.ObjectId, ref: 'Empresas', required: true},
		category: {type: String, required: true, max: 100},
		stock: {type: Number, required: true}
	});

/*
DescuentosSchema
.virtual('title')
.get(function () {
	return this.title;
});

DescuentosSchema
.virtual('stock')
.get(function () {
	return this.stock;
});

DescuentosSchema
.virtual('category')
.get(function () {
	return this.category;
});
*/


DescuentosSchema
.virtual('url')
.get(function() {
	return '/descuentos/'+this._id
});

module.exports = mongoose.model('Descuentos', DescuentosSchema);