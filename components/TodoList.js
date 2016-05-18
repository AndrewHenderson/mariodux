define(function(require) {

  'use strict';

  var Marionette = require('marionette');
  var store = require('store');
  var dispatch = store.dispatch;
  var toggleTodo = require('actions/index').toggleTodo;

  var Todo = Marionette.LayoutView.extend({

    tagName: 'li',

    template: function(props) {
      return props.text;
    },

    styles: {
      completed: {
        textDecoration: 'line-through'
      }
    },

    events: {
      click: 'onClick'
    },

    setStyles: function() {

      var isCompleted = this.model.get('completed');

      if (isCompleted) {
        this.$el.css(this.styles.completed);
      }
    },

    onRender: function() {
      this.setStyles();
    },

    onClick: function() {
      dispatch(toggleTodo(this.model.id));
    }

  });

  return Marionette.CollectionView.extend({

    childView: Todo,

    tagName: 'ul'

  });
});