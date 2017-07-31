var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	//locals.section = 'trademarks';

	// Most likely static page.
	// Search, Registration, and Watch will most likely also be static.
	// I've created blank routes for them in case anything else is needed.

  view.render('static/trademarks');
};
