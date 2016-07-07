define(function(require) {

  'use strict';

  var Marionette = require('marionette');
  var AddTodo = require('components/AddTodo');
  var TodoList = require('components/TodoList');
  var Footer = require('components/Footer');
  var todosContainer = require('containers/todos');

  return Marionette.LayoutView.extend({

    template: function() {

      return '<div id="addTodoRegion"/>'
          + '<div id="todoListRegion"/>'
          + '<div id="footerRegion"/>'
    },

    regions: {
      addTodoRegion: '#addTodoRegion',
      todoListRegion: '#todoListRegion',
      footerRegion: '#footerRegion'
    },

    showChildViews: function() {

      this.showChildView('addTodoRegion', new AddTodo());
      this.showChildView('todoListRegion', new TodoList({
        collection: todosContainer.getTodosCollection(),
        filter: todosContainer.getVisibilityFilter()
      }));
      this.showChildView('footerRegion', new Footer());
    },

    onRender: function() {
      this.showChildViews();
    }
  });
});