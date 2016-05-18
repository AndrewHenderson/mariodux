define(function(require) {

  'use strict';

  var _ = require('underscore');
  var $ = require('jquery');
  var Marionette = require('marionette');
  var store = require('store');
  var dispatch = store.dispatch;
  var selectReddit = require('actions/index').selectReddit;

  return Marionette.LayoutView.extend({

    template: function(props) {

      var selected = store.getState().selectedReddit;
      var options = _.reduce(props.options, function(memo, option) {
        var $option = $('<option>').val(option).text(option);
        if (selected === option) $option.attr('selected', true);
        return memo + $option.prop('outerHTML');
      }, '');

      return '<h1>' + selected + '</h1>'
        + '<span><select>' + options + '</select></span>';
    },

    templateHelpers: function() {

      return {
        options: ['reactjs', 'frontend']
      };
    },

    ui: {
      'select': 'select'
    },

    events: {
      'change @ui.select': 'onChange'
    },

    onChange: function() {
      dispatch(selectReddit(this.ui.select.val()));
    }
  });
});