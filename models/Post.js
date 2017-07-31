var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true, filters: { group: 'author' } },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage, note: 'Featured image.' },
	content: { type: Types.Html, wysiwyg: true },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	tags: { type: Types.Relationship, ref: 'Tag', many: true}
});

Post.relationship({ ref: 'Comment', refPath: 'post', path: 'comments' });

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
