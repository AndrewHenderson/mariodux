define(function(require) {

  'use strict';

  var combineReducers = require('redux').combineReducers;
  var todos = require('./todos');

  return combineReducers({
    todos: todos
  });

});