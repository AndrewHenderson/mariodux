define(function(require) {

  'use strict';

  var Backbone = require('backbone');
  var store = require('store');
  var collection;

  return {

    getTodosCollection: function() {

      var state = store.getState();
      var todos = state.todos;

      collection = collection || new Backbone.Collection([]);
      collection.add(todos, {merge: true});
      
      return collection;
    },

    getVisibilityFilter: function() {

      var state = store.getState();
      var visibilityFilter = state.visibilityFilter;

      switch (visibilityFilter) {

        case 'SHOW_ALL':
          return function () {
            return true;
          };

        case 'SHOW_COMPLETED':
          return function (child, index, collection) {
            return child.get('completed');
          };

        case 'SHOW_ACTIVE':
          return function (child, index, collection) {
            return !child.get('completed');
          };
      }
    }
  }
});