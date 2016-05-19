define(function(require) {

  'use strict';

  var _ = require('underscore');
  var Marionette = require('marionette');
  var Picker = require('components/Picker');
  var Posts = require('components/Posts');
  var postsCollection = require('containers/posts');
  var store = require('store');

  window.getState = store.getState; // FOR DEMO ONLY

  return Marionette.LayoutView.extend({

    template: function(props) {

      var refreshLink = props.isFetching ? '' : '<a href="#">Refresh</a>';
      var $postsContainer = $('<div><Posts/></div>');

      if (props.isFetching) {
        $postsContainer.css({ opacity: 0.5 });
      }

      return '<p><span>Last updated at ' + new Date(props.lastUpdated).toLocaleTimeString() + ' '
          + refreshLink
          + '<Picker/>'
          + $postsContainer.prop('outerHTML');
    },

    templateHelpers: function() {

      var state = store.getState();
      var selectedReddit = state.selectedReddit;
      var postsByReddit = state.postsByReddit;

      return _.defaults({
        isFetching: true,
        posts: []
      }, postsByReddit[selectedReddit]);
    },

    regions: {
      Picker: 'Picker',
      Posts: 'Posts'
    },

    showChildViews: function() {

      this.showChildView('Picker', new Picker());
      this.showChildView('Posts', new Posts({
        collection: postsCollection
      }));

      if (postsCollection.isEmpty()) {
        postsCollection.fetchPostsIfNeeded();
      }

      return this;
    },

    onRender: function() {
      this.showChildViews();
    }
  });
});