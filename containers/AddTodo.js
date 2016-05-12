define(function(require) {

  'use strict';

  var Marionette = require('marionette');
  var store = require('store');
  var dispatch = store.dispatch;
  var addTodo = require('actions/index').addTodo;

  var AddTodo = Marionette.LayoutView.extend({

    template: function() {

      return '<form class="form-inline">'
          + '<div class="form-group">'
          + '<input class="form-control"/>'
          + '</div>'
          + '<button type="submit" class="btn btn-primary">Add Todo</button>'
          + '</form>';
    },

    ui: {
      form: 'form',
      input: 'input'
    },

    events: {
      'submit @ui.form': 'onSubmitForm'
    },

    onSubmitForm: function(e) {
      e.preventDefault();
      dispatch(addTodo(this.ui.input.val().trim()));
      this.ui.input.val('');
    }

  });

  return new AddTodo();

});