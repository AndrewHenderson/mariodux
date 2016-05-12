define(function(require) {

  'use strict';

  var Backbone = require('backbone');

  var TodosCollection = Backbone.Collection.extend({

    getVisibleTodos: function(collection, filter) {

      collection = this;

      switch (filter) {
        case 'SHOW_ALL':
          return collection.models;
        case 'SHOW_COMPLETED':
          return collection.where({ completed: true });
        case 'SHOW_ACTIVE':
          return collection.where({ completed: false });
      }
    }
  });

  var todosCollection = new TodosCollection([]);

  function todo(model, action) {

    switch (action.type) {
      case 'ADD_TODO':
        return {
          id: action.id,
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

        collection.add(todo(undefined, action));

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