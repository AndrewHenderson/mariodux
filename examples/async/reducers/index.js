define(function(require) {

  'use strict';

  var _ = require('underscore');
  var combineReducers = require('redux').combineReducers;

  function selectedReddit(state, action) {

    state = state || 'reactjs';

    switch (action.type) {
      case 'SELECT_REDDIT':
        return action.reddit;
      default:
        return state;
    }
  }

  function posts(state, action) {

    state = state || {
      isFetching: false,
      didInvalidate: false,
      items: []
    };

    switch (action.type) {
      case 'INVALIDATE_REDDIT':
        return _.extend({}, state, {
          didInvalidate: true
        });
      case 'REQUEST_POSTS':
        return _.extend({}, state, {
          isFetching: true,
          didInvalidate: false
        });
      case 'RECEIVE_POSTS':
        return _.extend({}, state, {
          isFetching: false,
          didInvalidate: false,
          items: action.posts,
          lastUpdated: action.receivedAt
        });
      default:
        return state;
    }
  }

  function postsByReddit(state, action) {

    state = state || {};

    switch (action.type) {
      case 'INVALIDATE_REDDIT':
      case 'RECEIVE_POSTS':
      case 'REQUEST_POSTS':
        var _state = _.extend({}, state);
        _state[action.reddit] = posts(state[action.reddit], action);
        return _state;
      default:
        return state;
    }
  }

  return combineReducers({
    postsByReddit: postsByReddit,
    selectedReddit: selectedReddit
  });

});