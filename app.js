define(function(require) {

  'use strict';

  var Backbone = require('backbone');
  var Marionette = require('marionette');
  var Handlebars = require('handlebars');
  var Router = require('router');
  var Root = require('root');
  var root = new Root();

  var app;
  var router;

  Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
    return Handlebars.default.compile(rawTemplate);
  };

  app = new Marionette.Application();

  app.addRegions({
    rootRegion: '#root'
  });

  app.rootRegion.show(root);

  router = new Router();

  Backbone.history.start();

  return app;
});