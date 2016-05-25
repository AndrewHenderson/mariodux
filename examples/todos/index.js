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
  var router;

  store.subscribe(function updateDOM() {

    var realDOM = root.$el[0];
    var virtualDOM = virtualRoot.render().$el[0];

    morphdom(realDOM, virtualDOM, {

      childrenOnly: true,

      onBeforeElUpdated: function(fromEl, toEl) {
        if (fromEl.hasAttribute('ref')) {
          $(toEl).trigger('before:update', fromEl);
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