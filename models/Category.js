var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Category Model
 * ==================
 */

var Category = new keystone.List('Category', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Category.add({
	name: { type: String, required: true },
	description: { type: Types.Textarea, initial: true }
});

Category.relationship({ ref: 'Document', path: 'documents', refPath: 'categories' });

Category.register();
