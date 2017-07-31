var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Package Service Model
 *
 * This should be modified in order to sync with Stripe.
 *
 * ==================
 */

var Service = new keystone.List('Service', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Service.add({
	name: { type: String, required: true },
	description: { type: Types.Textarea, initial: true },
});

Service.relationship({ ref: 'Product', path: 'products', refPath: 'services' });

Service.register();
