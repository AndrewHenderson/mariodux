define(function(require) {

  'use strict';

  var nextTodoId = 0;
  var cache = [];

  return function todosReducer(todos, action) {

    todos = cache;

    switch (action.type) {

      case 'ADD_TODO':

        todos.push({
          id: nextTodoId++,
          text: action.text,
          completed: false
        });

        return todos;

        break;

      case 'TOGGLE_TODO':

        var todo = _.find(todos, { id: action.id });

        todo.completed = !todo.completed;

        return todos;

        break;

      default:

        return todos;
    }
  };
});