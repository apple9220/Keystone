var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	//locals.section = '';
	locals.filters = {
		product: req.params.product,
	};
	locals.product = [];

	view.on('init', function (next) {

		var q = keystone.list('Product').model.findOne({
			slug: locals.filters.product,
		}).populate('services');

		q.exec(function (err, result) {
			locals.product = result;

			next(err);
		});

	});

  view.render('product');
};
