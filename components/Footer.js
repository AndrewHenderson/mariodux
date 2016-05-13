define(function(require) {

  'use strict';

  var Marionette = require('marionette');
  var store = require('store');

  return Marionette.LayoutView.extend({

    template: function() {

      var state = store.getState();
      var visibilityFilter = state.visibilityFilter;

      var showAll = visibilityFilter !== 'SHOW_ALL' ? '<a href="#SHOW_ALL">All</a>' : '<span>All</span>';
      var showActive = visibilityFilter !== 'SHOW_ACTIVE' ? '<a href="#SHOW_ACTIVE">Active</a>' : '<span>Active</span>'
      var showCompleted = visibilityFilter !== 'SHOW_COMPLETED' ? '<a href="#SHOW_COMPLETED">Completed</a>' : '<span>Completed</span>'

      return '<p>Show: '
        + showAll
        + showActive
        + showCompleted
        + '</p>';
    }
  });
});