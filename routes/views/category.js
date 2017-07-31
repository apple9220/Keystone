var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.filters = {
		category: req.params.category,
	};
	locals.category = [];
	locals.documents = [];

	// Init locals
	//locals.section = 'templates';

	view.on('init', function (next) {

		var q = keystone.list('Category').model.findOne({
			slug: locals.filters.category,
		});

		q.exec(function (err, result) {
			locals.category = result;
			keystone.list('Document').model.find().where('category', result).exec(function(err, documents) {
				locals.documents = documents;
			});

			next(err);
		});

	});

  view.render('category');
};
