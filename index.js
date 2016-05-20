define(function(require) {

  'use strict';

  var $ = require('jquery');
  var Backbone = require('backbone');
  var Marionette = require('marionette');
  var morphdom = require('morphdom');
  var Router = require('router');
  var Root = require('root');
  var store = require('store');

  window.getState = store.getState; // FOR DEMO ONLY

  var root = new Root();
  var virtualRoot = new Root();
  var app;
  var router;

  store.subscribe(function updateDOM() {

    var realDOM = root.$el[0];
    var virtualDOM = virtualRoot.render().$el.prop('outerHTML');

    morphdom(realDOM, virtualDOM, {

      childrenOnly: true,

      onBeforeElUpdated: function(fromEl, toEl) {

        var isMorphable = !$(fromEl).is('[ref]');

        return isMorphable; // If false realDOM child node will not be updated
      }
    });
  });

  app = new Marionette.Application();

  app.addRegions({
    appRegion: '#app'
  });

  new Router();

  Backbone.history.start();

  app.appRegion.show(root);

});