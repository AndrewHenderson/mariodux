define(function(require) {

  'use strict';

  var Backbone = require('backbone');
  var TodosCollection = new Backbone.Collection([]);

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

    collection = TodosCollection;

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