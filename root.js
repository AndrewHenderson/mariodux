define(function(require) {

  'use strict';

  var Marionette = require('marionette');
  var store = require('store');
  var AddTodo = require('components/AddTodo');
  var TodoList = require('components/TodoList');
  var Footer = require('components/Footer');
  var Backbone = require('backbone');

  window.getState = store.getState; // FOR DEMO ONLY

  return Marionette.LayoutView.extend({

    template: function() {

      return '<div id="AddTodo"></div>'
          + '<div id="TodoList"></div>'
          + '<div id="Footer"></div>'
    },

    regions: {
      AddTodo: '#AddTodo',
      TodoList: '#TodoList',
      Footer: '#Footer'
    },

    showChildViews: function() {

      var state = store.getState();
      var todosCollection = state.todos;
      var visibilityFilter = state.visibilityFilter;
      var visibleTodos = todosCollection.getVisibleTodos(visibilityFilter);
      var todoListCollection = new Backbone.Collection(visibleTodos);

      this.showChildView('AddTodo', new AddTodo());
      this.showChildView('TodoList', new TodoList({
        collection: todoListCollection
      }));
      this.showChildView('Footer', new Footer());

      return this;
    },

    onRender: function() {
      this.showChildViews();
    }
  });
});