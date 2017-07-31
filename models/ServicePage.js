var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ServicePage Model
 * ==========
 */

var ServicePage = new keystone.List('ServicePage', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

ServicePage.add({
	title: { type: String, required: true },
  description: { type: Types.Textarea, initial: true },
	features: { type: Types.Html, wysiwyg: true, height: 100, initial: true },

});

ServicePage.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
ServicePage.register();
