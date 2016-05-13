define(function(require) {

  'use strict';

  var Backbone = require('backbone');
  var nextTodoId = 0;

  var todosCollection = new Backbone.Collection([]);

  return function todos(collection, action) {

    collection = todosCollection;

    switch (action.type) {

      case 'ADD_TODO':

        collection.add({
          id: nextTodoId++,
          text: action.text,
          completed: false
        });

        return collection.toJSON();

        break;

      case 'TOGGLE_TODO':

        var model = collection.get(action.id);

        model.set({
          completed: !model.get('completed')
        });

        return collection.toJSON();

        break;

      default:

        return collection.toJSON();
    }
  };
});