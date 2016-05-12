define(function(require) {

  'use strict';

  var combineReducers = require('redux').combineReducers;
  var todos = require('./todos');
  var visibilityFilter = require('./visibilityFilter');

  return combineReducers({
    todos: todos,
    visibilityFilter: visibilityFilter
  });

});