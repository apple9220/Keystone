var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Package Model
 * ==================
 */

var Order = new keystone.List('Order', {
	nocreate: true,
  nodedit: true
});

Order.add({
	customer: { type: Types.Relationship, ref: 'User', many: false, index: true,initial:true },
	products: { type: Types.Relationship, ref: 'Product', many: true, index: true , required: true,initial:true},
  stripeToken: { type: String, label: 'Stripe Token', required: true },
});

Order.defaultSort = '-createdAt';
Order.defaultColumns = 'customer, products';
Order.register();
