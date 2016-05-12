(function(require) {
  'use strict';

  // Store require configuration as an object so that it can be exported
  // if this file is required from within the Node.js developer tools
  require.config({

    paths: {
      jquery: 'bower_components/jquery/dist/jquery',
      underscore: 'bower_components/underscore/underscore',
      backbone: 'bower_components/backbone/backbone',
      marionette: 'bower_components/backbone.marionette/lib/backbone.marionette',
      handlebars: 'bower_components/handlebars/handlebars.amd',
      redux: 'bower_components/redux/index',
      morphdom: 'bower_components/morphdom/dist/morphdom-umd'
    }

  });

})(require);