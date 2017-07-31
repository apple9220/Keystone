var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.types = [];
	locals.products = [];

	// Init locals
	//locals.section = 'offers';

	view.on('init', function(next) {

		keystone.list('Product').model.find().sort('sortOrder').exec(function(err, products) {

			locals.products = [];

			for (i=0; i < products.length; i++) {
				locals.types.push(products[i].type);
			};

			next(err);

		});

	});

  view.render('products');
};
