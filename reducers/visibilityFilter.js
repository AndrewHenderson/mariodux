define(function() {

  'use strict';

  return function visibilityFilter(state, action) {

    state = 'SHOW_ALL';

    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter;
        break;
      default:
        return state;
    }
  }
});
