define(function(require) {

  'use strict';

  var _ = require('underscore');
  var Marionette = require('marionette');
  var Picker = require('components/Picker');
  var Posts = require('components/Posts');
  var postsContainer = require('containers/posts');
  var store = require('store');
  var dispatch = store.dispatch;
  var invalidateReddit = require('actions/index').invalidateReddit;

  return Marionette.LayoutView.extend({

    template: function(props) {

      var lastUpdated = props.lastUpdated ? '<p><span>Last updated at ' + new Date(props.lastUpdated).toLocaleTimeString() + '. ' : '';
      var refreshLink = !props.isFetching ? '<a href="#">Refresh</a>' : '';

      return '<Picker/>'
          + lastUpdated
          + refreshLink
          + '</p>'
          + '<Posts/>'
    },

    templateHelpers: function() {

      var state = store.getState();
      var selectedReddit = state.selectedReddit;
      var postsByReddit = state.postsByReddit;
      var selectedPosts = postsByReddit[selectedReddit];

      return _.extend({
        isFetching: true,
        posts: []
      }, selectedPosts);
    },

    ui: {
      refresh: 'a'
    },

    regions: {
      Picker: 'Picker',
      Posts: 'Posts'
    },

    events: {
      'click @ui.refresh': 'onClickRefresh'
    },

    showChildViews: function() {

      this.showChildView('Picker', new Picker());
      this.showChildView('Posts', new Posts({
        collection: postsContainer.getSelectedPosts()
      }));

      postsContainer.fetchPostsIfNeeded();

      return this;
    },

    onRender: function() {
      this.showChildViews();
    },

    onClickRefresh: function(e) {

      var selectedReddit = store.getState().selectedReddit;

      e.preventDefault();

      dispatch(invalidateReddit(selectedReddit));
      postsContainer.fetchPostsIfNeeded();
    }
  });
});