var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	//locals.section = 'banks';

	locals.products = [];

	view.on('init', function (next) {

			keystone.list('Product').model.find().where('type', 'bank account').exec(function(err, products) {
				locals.products = products;
			});

			next(err);
	});


  view.render('banks');
};
