define(function(require) {

  var Backbone = require('backbone');
  var root = require('root');

  return Backbone.Router.extend({

    routes: {
      '': 'default'
    },

    'default': function () {
      // Nothing here
    }
  });
});