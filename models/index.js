'use strict';

// TODO move this to explicit registration
// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
// require('fs').readdirSync(__dirname + '/').forEach(function(file) {
//   if (file.match(/\.js$/) !== null && file !== 'index.js') {
//     var name = file.replace('.js', '');
//     exports[name] = require('./' + file);
//   }
// });


// TODO move to the modules
module.exports = {
  messages: require('./messages'),
  gps: require('./gps'),
  group: require('./group'),
  workflows: require('./workflows'),
  file: require('./file'),
  membership: require('./membership'),
  workorders: require('./workorders'),
  result: require('./result')
};