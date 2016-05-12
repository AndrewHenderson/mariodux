define(function(require) {

  'use strict';

  var Marionette = require('marionette');
  var store = require('store');
  var dispatch = store.dispatch;
  var setVisibilityFilter = require('actions/index').setVisibilityFilter;

  return Marionette.LayoutView.extend({

    template: function() {
      return '<p>Show: <a data-filter="SHOW_ALL">All</a>'
      + '<a data-filter="SHOW_ACTIVE">Active</a>'
      + '<a data-filter="SHOW_COMPLETED">Completed</a>'
      + '</p>';
    },

    ui: {
      link: 'a'
    },

    events: {
      'click @ui.link': 'onClickLink'
    },

    onClickLink: function(e) {
      var filter = $(e.target).data('filter');
      dispatch(setVisibilityFilter(filter));
    }
  });
});