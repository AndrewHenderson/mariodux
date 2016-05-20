define(function(require) {

  'use strict';

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
      childrenOnly: true
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