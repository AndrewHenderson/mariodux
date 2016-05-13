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
      'default': {
        textDecoration: 'none'
      },
      completed: {
        textDecoration: 'line-through'
      }
    },

    events: {
      click: 'onClick'
    },

    setStyles: function() {

      var styles = this.styles.default;
      var isCompleted = this.model.get('completed');

      if (isCompleted) {
        styles = this.styles.completed;
      }

      this.$el.css(styles);
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