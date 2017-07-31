var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Model
 * ==========
 */

var Product = new keystone.List('Product', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Product.add({
	title: { type: String, required: true },
	kind: { type: Types.Select, options: 'company-formation, bank-account'},
  country: { type: String },
  region: {type: Types.Select, options: 'Europe, North and South America, Asia, Africa, Middle East, Oceania and Pacific Islands, Carribean Region'},
  price: {type: Types.Number, required: true, initial: true},
  description: { type: Types.Text },
	image: { type: Types.CloudinaryImage, note: '(Optional)' }, // For country flag
	content: { type: Types.Html, wysiwyg: true, height: 400 },
	services: { type: Types.Relationship, ref: 'Service', many: true }, // These are for payed package services.
}, 'Information', {
	// Company Formation Information
	corporateInformation: { type: Types.Html, wysiwyg: true, height: 400, dependsOn: {type: 'company formation'}},
	taxation: { type: Types.Html, wysiwyg: true, height: 400, dependsOn: {type: 'company formation'}},
	// Bank Account Information
	aboutTheBank: { type: Types.Html, wysiwyg: true, height: 400, dependsOn: {type: 'bank account'}},
	facilities: { type: Types.Html, wysiwyg: true, height: 400, dependsOn: {type: 'bank account'}},
});

Product.defaultColumns = 'title, type';
Product.register();
