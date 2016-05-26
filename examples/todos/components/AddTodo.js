define(function(require) {

  'use strict';

  var Marionette = require('marionette');
  var store = require('store');
  var dispatch = store.dispatch;
  var addTodo = require('actions/index').addTodo;

  return Marionette.LayoutView.extend({

    template: function() {

      return '<form class="form-inline">'
        + '<div class="form-group">'
        + '<input ref type="text" class="form-control">' // Using ref attribute to preserve the input's value
        + '</div>'
        + '<button type="submit" class="btn btn-primary">Add Todo</button>'
        + '</form>';
    },

    ui: {
      form: 'form',
      input: 'input'
    },

    events: {
      'submit @ui.form': 'onSubmitForm',
      'before:update @ui.input': 'onBeforeUpdateInput'
    },

    onBeforeUpdateInput: function(e, fromEl) {

      var $fromEl = $(fromEl);

      this.ui.input.val($fromEl.val());
    },

    onSubmitForm: function(e) {

      var value = this.ui.input.val().trim();

      e.preventDefault();

      if (value) {
        dispatch(addTodo(value));
        this.ui.input.val('');
      }
    }

  });
});