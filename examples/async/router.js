define(function(require) {

  var Backbone = require('backbone');
  var store = require('store');
  var dispatch = store.dispatch;
  var setVisibilityFilter = require('actions/index').setVisibilityFilter;

  return Backbone.Router.extend({

    routes: {
      ':filter': 'filter'
    },

    filter: function (filter) {
      dispatch(setVisibilityFilter(filter));
    }
  });
});