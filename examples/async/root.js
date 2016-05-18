define(function(require) {

  'use strict';

  var Marionette = require('marionette');
  var Picker = require('components/Picker');

  window.getState = require('store').getState; // FOR DEMO ONLY

  return Marionette.LayoutView.extend({

    template: function() {

      return '<div id="Picker"></div>'
    },

    regions: {
      Picker: '#Picker',
    },

    showChildViews: function() {

      this.showChildView('Picker', new Picker());

      return this;
    },

    onRender: function() {
      this.showChildViews();
    }
  });
});