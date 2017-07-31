var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var Comment = new keystone.List('Comment', {
	nocreate: true,
	noedit: true,
});

Comment.add({
	content: { type: Types.Textarea, required: true },
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	createdAt: { type: Date, default: Date.now },
	post: { type: Types.Relationship, ref: 'Post', index: true },
});


Comment.register();
