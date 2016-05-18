define(function() {

  function addTodo(text) {
    return {
      type: 'ADD_TODO',
      text: text
    }
  }

  function toggleTodo(id) {
    return {
      type: 'TOGGLE_TODO',
      id: id
    }
  }

  function setVisibilityFilter(filter) {
    return {
      type: 'SET_VISIBILITY_FILTER',
      filter: filter
    }
  }

  return {
    addTodo: addTodo,
    toggleTodo: toggleTodo,
    setVisibilityFilter: setVisibilityFilter
  };
});
