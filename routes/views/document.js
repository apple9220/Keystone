var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	//locals.section = '';
	locals.filters = {
		document: req.params.document,
	};
	locals.document = [];

	view.on('init', function (next) {

		var q = keystone.list('Document').model.findOne({
			slug: locals.filters.document,
		});

		q.exec(function (err, result) {
			locals.document = result;

			next(err);
		});

	});

  view.render('document');
};
