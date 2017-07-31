var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	//locals.section = 'packages';
	view.query('packages', keystone.list('Package').model.find().sort('sortOrder'));

  view.render('packages');
};
