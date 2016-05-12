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

    attributes: function() {

      var textDecoration = this.styles.default.textDecoration;

      if (this.model.get('completed')) {
        textDecoration = this.styles.completed.textDecoration;
      }

      return {
        style: 'text-decoration: ' + textDecoration
      }
    },

    styles: {
      default: {
        textDecoration: 'none'
      },
      completed: {
        textDecoration: 'line-through'
      }
    },

    modelEvents: {
      'change:completed': 'onChangeCompleted'
    },

    onChangeCompleted: function() {

      var styles = this.styles.default;
      var isCompleted = this.model.get('completed');

      if (isCompleted) {
        styles = this.styles.completed;
      }

      this.$el.css(styles);
    },

    events: {
      click: 'onClick'
    },

    onClick: function() {
      dispatch(toggleTodo(this.model.id));
    }

  });

  var TodoList = Marionette.CollectionView.extend({

    childView: Todo,

    tagName: 'ul',

    childViewOptions: {
      state: store.getState()
    }

  });

  return new TodoList({
    collection: store.getState().todos
  });

});