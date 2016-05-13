define(function(require) {

  'use strict';

  var Backbone = require('backbone');
  var store = require('store');

  return {

    getVisibleCollection: function() {

      var state = store.getState();
      var todos = state.todos;
      var visibilityFilter = state.visibilityFilter;
      var collection = new Backbone.Collection(todos);
      var visibleTodos;

      switch (visibilityFilter) {

        case 'SHOW_ALL':
          return collection;

        case 'SHOW_COMPLETED':
          visibleTodos = collection.where({completed: true});
          collection.reset(visibleTodos);
          return collection;

        case 'SHOW_ACTIVE':
          visibleTodos = collection.where({completed: false});
          collection.reset(visibleTodos);
          return collection;
      }
    }
  }
});