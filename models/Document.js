var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Document Model
 * ==========
 */

var Document = new keystone.List('Document', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Document.add({
	title: { type: String, required: true },
	description: { type: Types.Html, wysiwyg: true, height: 300 },
	image: { type: Types.CloudinaryImage, note: "Document image."},
	size: { type: String },
	format: { type: String },
	languages: { type: String },
	Pages: { type: String },
	category: { type: Types.Relationship, ref: 'Category' },
	lastUpdate: { type: Date, default: Date.now },
});

Document.relationship({ ref: 'Package', path: 'packages', refPath: 'documents' });

Document.defaultColumns = 'title, type';
Document.register();
