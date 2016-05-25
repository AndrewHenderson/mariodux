define(function(require) {

  'use strict';

  var createStore = require('redux').createStore;
  var todoApp = require('reducers/index');

  return createStore(todoApp);

});