define(function() {

  'use strict';

  var defaultState = 'SHOW_ALL';

  return function visibilityFilter(state, action) {

    state = state || defaultState;

    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter;
        break;
      default:
        return state;
    }
  }
});
