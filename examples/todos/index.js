define(function(require) {

  'use strict';

  var $ = require('jquery');
  var Backbone = require('backbone');
  var Marionette = require('marionette');
  var morphdom = require('morphdom');
  var Router = require('router');
  var Root = require('root');
  var store = require('store');

  window.getState = store.getState; // FOR DEMO PURPOSES ONLY

  var root = new Root();
  var virtualRoot = new Root();
  var app;

  store.subscribe(function updateDOM() {

    var windowDOM = root.$el[0];
    var virtualDOM = virtualRoot.render().$el[0];

    morphdom(windowDOM, virtualDOM, {

      childrenOnly: true,

      onBeforeElUpdated: function(fromEl, toEl) {

        var newModel = $(toEl).data('model');

        if (fromEl.hasAttribute('ref')) {
          $(toEl).trigger('before:update', fromEl);
        }

        if (newModel) {
          $(fromEl).data('model', newModel);
        }
      }
    });
  });

  app = new Marionette.Application();

  app.addRegions({
    appRegion: '#appRegion'
  });

  new Router();

  Backbone.history.start();

  app.appRegion.show(root);

});