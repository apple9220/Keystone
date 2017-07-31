var keystone = require('keystone');
var Types = keystone.Field.Types;
var countries = require('../tools/countries');

/**
 * User Model
 * ==========
 */
 var User = new keystone.List('User', {
 	track: true,
 });

User.add({
  name: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
  password: { type: Types.Password, initial: true, required: true },
  resetPasswordKey: { type: String, hidden: true },
  group: { type: Types.Select, options: 'customer, author, admin', initial: true, },
}, 'Permissions', {
  isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
}, 'Customer Fields', {
  phone: { type: String, label: 'Phone number', dependsOn: {group: 'customer'}},
  country: { type: Types.Select, label: 'Country', options: countries, dependsOn: {group: 'customer'}},
}, 'Author Fields', {
  photo: { type: Types.CloudinaryImage, label: 'Profile photo', dependsOn: {group: 'author'}},
  description: { type: Types.Textarea, label: 'Short author bio', dependsOn: {group: 'author'}},
  title: { type: Types.Text, label: 'Title of author', dependsOn: {group: 'author'}},
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin;
});


/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Reset password
 */
User.schema.methods.resetPassword = function(callback) {
  var user = this;
  user.resetPasswordKey = keystone.utils.randomString([16,24]);
  user.save(function(err) {
    if (err) return callback(err);
    new keystone.Email('forgotten-password').send({
      user: user,
      link: '/reset-password/' + user.resetPasswordKey,
      subject: 'Reset your Agent Legal Password',
      to: user.email,
      from: {
        name: 'Agent Legal',
        email: 'info@agentlegal.com'
      }
    }, callback);
  });
};


/**
 * Registration
 */

User.defaultColumns = 'name, email, group';

User.register();
