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
    var virtualDOM = virtualRoot.render().$el[0];

    morphdom(realDOM, virtualDOM, {

      onBeforeElChildrenUpdated: function(fromEl, toEl) {

        var isMorphable = !$(fromEl).is('[nomorph]');

        return isMorphable; // if false realDOM child node will not be updated
      }
    });
  });

  app = new Marionette.Application();

  app.addRegions({
    rootRegion: '#root'
  });

  new Router();

  Backbone.history.start();

  app.rootRegion.show(root);

});