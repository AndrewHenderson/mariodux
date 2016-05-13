define(function(require) {

  'use strict';

  var Backbone = require('backbone');
  var nextTodoId = 0;

  var TodosCollection = Backbone.Collection.extend({

    getVisibleTodos: function(filter) {

      switch (filter) {

        case 'SHOW_ALL':
          return this.models;

        case 'SHOW_COMPLETED':
          return this.where({ completed: true });

        case 'SHOW_ACTIVE':
          return this.where({ completed: false });
      }
    }
  });

  var todosCollection = new TodosCollection([]);

  function todo(action) {

    switch (action.type) {

      case 'ADD_TODO':

        return {
          id: nextTodoId++,
          text: action.text,
          completed: false
        };

      default:
        return model
    }
  }

  return function todos(collection, action) {

    collection = todosCollection;

    switch (action.type) {

      case 'ADD_TODO':

        collection.add(todo(action));

        return collection;

        break;

      case 'TOGGLE_TODO':

        var model = collection.get(action.id);

        model.set({
          completed: !model.get('completed')
        });

        return collection;

        break;

      default:

        return collection;
    }
  };
});