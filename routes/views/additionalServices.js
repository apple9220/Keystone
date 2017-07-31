var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	//locals.section = 'additionalServices';

	locals.additionalService = req.params.additionalService;

	// A view(s) can be created which handels the request above
	// using 'if' statements + partials, thereby rendering the necessary
	// content based off of URL request.

  view.render('static/additionalServices');
};
