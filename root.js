define(function(require) {

  'use strict';

  var Marionette = require('marionette');
  var store = require('store');
  var AddTodo = require('containers/AddTodo');
  var TodoList = require('components/TodoList');

  window.store = store; // FOR DEMO ONLY

  var View = Marionette.LayoutView.extend({

    template: function() {

      return '<div id="AddTodo"></div>'
          + '<div id="TodoList"></div>'
    },

    regions: {
      AddTodo: '#AddTodo',
      TodoList: '#TodoList'
    },

    childViewOptions: {
      state: store.getState()
    },

    showAddTodo: function() {
      this.showChildView('AddTodo', AddTodo);
    },

    showTodoList: function() {
      this.showChildView('TodoList', TodoList);
    }

  });

  return new View();

});