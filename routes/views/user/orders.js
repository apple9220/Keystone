var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.types = [];
	locals.orders = [];

	// Init locals
	//locals.section = 'offers';

	view.on('init', function(next) {

		keystone.list('Order').model.find().sort('sortOrder').exec(function(err, orders) {

			locals.orders = [];

			for (i=0; i < orders.length; i++) {
				locals.types.push(orders[i].type);
			};

			next(err);

		});

	});

  view.render('orders');
};
