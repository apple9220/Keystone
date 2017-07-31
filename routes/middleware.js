/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {

	res.locals.navLinks = [
		{ label: 'Services', key: 'services', href: '#', children: true },
		{ label: 'Start Up Packs', key: 'packages', href: '/packages', children: false },
		{ label: 'Templates', key: 'documents', href: '/documents', children: false },
		{ label: 'Offers', key: 'offers', href: '/offers', children: false },
    { label: 'Library', key: 'library', href: '/library', children: false },
	];

  if(req.user) res.locals.navLinks.push( {label: 'My Orders',		key: 'order',		href: '/orders' });

  res.locals.childLinks = [
    { childKey: 'services', links: [
      { label: 'Company Formation', href: '/companies' },
  		{ label: 'Bank Account Opening', href: '/banks'},
      { label: 'Trademarks', href: '/trademarks'},
      { label: 'Additional Services', href: '/additional-services'},
    ]},
  ];

  if (req.session.cart == undefined) req.session.cart = [];
  res.locals.itemCount = 0;
  res.locals.total = 0;
  res.locals.product_ids = [];
  req.session.cart.forEach(function (product) {
    res.locals.itemCount += 1;
    res.locals.product_ids += product._id
    res.locals.total += product.price;
  });


	res.locals.user = req.user;
	next();

};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */


exports.requireUser = function(req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/login');
	} else {
		next();
	}
}
