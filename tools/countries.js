var countries = require('../data/countries.json');

var names = [];

for (var i = 0; i < countries.length; i++) {
  names.push(countries[i].name);
}

module.exports = names.join(', ');
