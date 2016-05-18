define(function(require) {

  'use strict';

  var Marionette = require('marionette');
  var AddTodo = require('components/AddTodo');
  var TodoList = require('components/TodoList');
  var Footer = require('components/Footer');
  var todosContainer = require('containers/todos');

  window.getState = require('store').getState; // FOR DEMO ONLY

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

      var todoListCollection = todosContainer.getVisibleCollection();

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