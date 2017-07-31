var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	//locals.section = 'additionalServices';

	// Assuming this will be a static page with a simple, additional
	// service param filter. So I've set up this route and the necessary
	// 'additionalService.js' route.


  view.render('static/additionalServices');
};
