var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.package = [];
	locals.filters = {
		package: req.params.package,
	};

	// Init locals
	//locals.section = '';

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Package').model.findOne({
			slug: locals.filters.package,
		}).populate('documents');

		q.exec(function (err, result) {
			locals.package = result;
			next(err);
		});

	});

  view.render('package');
};
