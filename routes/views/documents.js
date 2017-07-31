var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
  locals.categories = [];

	// Init locals
	//locals.section = 'templates';

	view.on('init', function(next) {

		keystone.list('Document').model.find().sort('sortOrder').populate('category').exec(function(err, documents) {

			for (i=0; i < documents.length; i++) {
				locals.categories.push(documents[i].category);
			};

			next(err);

		});

	});

  view.render('documents');
};
