define(function(require) {

  'use strict';

  var Marionette = require('marionette');
  var store = require('store');
  var AddTodo = require('containers/AddTodo');
  var TodoList = require('components/TodoList');
  var Footer = require('components/Footer');

  window.store = store; // FOR DEMO ONLY

  var View = Marionette.LayoutView.extend({

    template: function() {

      return '<div id="AddTodo"></div>'
          + '<div id="TodoList"></div>'
          + '<div id="Footer"></div>'
    },

    regions: {
      AddTodo: '#AddTodo',
      TodoList: '#TodoList',
      Footer: '#Footer'
    },

    onRender: function() {
      this.showChildView('AddTodo', AddTodo);
      this.showChildView('TodoList', TodoList);
      this.showChildView('Footer', Footer);
    }
  });

  return new View();

});