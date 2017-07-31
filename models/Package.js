var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Package Model
 * ==================
 */

var Package = new keystone.List('Package', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Package.add({
	name: { type: String, required: true },
  price: {type: Types.Number, note: 'USD' },
  value: {type: Types.Number, note: 'USD' },
	description: { type: Types.Textarea, initial: true },
	features: { type: Types.Html, wysiwyg: true, height: 300, initial: true },
	documents: { type: Types.Relationship, ref: 'Document', many: true },
}, 'Information', {
	usefulInformation: { type: Types.Html, wysiwyg: true, height: 400 }
});

Package.register();
