var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	//locals.section = 'companies';
	locals.products = [];
  locals.regions = [];

	view.on('init', function (next) {

			keystone.list('Product').model.find().where('kind', 'company-formation').exec(function(err, products) {
        console.log(products);
				locals.products = products;
        for (i=0; i < products.length; i++) {
  				locals.regions.push(products[i].region);
  			};
        console.log(locals.regions);
        next();
			});


	});


  view.render('companies');
};
