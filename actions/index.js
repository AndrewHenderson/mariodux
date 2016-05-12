define(function() {

  var nextTodoId = 0;

  function addTodo(text) {
    return {
      type: 'ADD_TODO',
      id: nextTodoId++,
      text: text
    }
  }

  function setVisibilityFilter(filter) {
    return {
      type: 'SET_VISIBILITY_FILTER',
      filter: filter
    }
  }

  function toggleTodo(id) {
    return {
      type: 'TOGGLE_TODO',
      id: id
    }
  }

  return {
    addTodo: addTodo,
    setVisibilityFilter: setVisibilityFilter,
    toggleTodo: toggleTodo
  };
});
