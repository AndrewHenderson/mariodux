define(function(require) {

  'use strict';

  var Marionette = require('marionette');
  var store = require('store');
  var AddTodo = require('containers/AddTodo');
  var TodoList = require('components/TodoList');
  var Footer = require('components/Footer');
  var Backbone = require('backbone');

  window.store = store; // FOR DEMO ONLY

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

    initialize: function(options) {
      if (options.root) {
        this.root = options.root;
      }
    },

    showChildViews: function() {

      var todos = store.getState().todos;
      var visibilityFilter = store.getState().visibilityFilter;
      var visibleTodos = todos.getVisibleTodos(undefined, visibilityFilter);
      var AddTodoOptions;

      if (this.root && this.root.getChildView('AddTodo')) {
        AddTodoOptions = {
          value: this.root.getChildView('AddTodo').ui.input.val()
        }
      }

      this.showChildView('AddTodo', new AddTodo(AddTodoOptions));
      this.showChildView('TodoList', new TodoList({
        collection: new Backbone.Collection(visibleTodos)
      }));
      this.showChildView('Footer', new Footer());

      return this;
    },

    onRender: function() {
      this.showChildViews();
    }
  });
});