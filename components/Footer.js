define(function(require) {

  'use strict';

  var Marionette = require('marionette');

  return Marionette.LayoutView.extend({

    template: function() {
      return '<p>Show: <a href="#SHOW_ALL">All</a>'
      + '<a href="#SHOW_ACTIVE">Active</a>'
      + '<a href="#SHOW_COMPLETED">Completed</a>'
      + '</p>';
    }
  });
});