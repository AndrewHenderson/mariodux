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

      return '<div id="pickerRegion"/>'
          + lastUpdated
          + refreshLink
          + '</p>'
          + '<div id="postsRegion"/>'
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
      refreshLink: 'a'
    },

    regions: {
      pickerRegion: '#pickerRegion',
      postsRegion: '#postsRegion'
    },

    events: {
      'click @ui.refreshLink': 'onClickRefreshLink'
    },

    showChildViews: function() {

      this.showChildView('pickerRegion', new Picker());

      postsContainer.fetchPostsIfNeeded();
      this.showChildView('postsRegion', new Posts({
        collection: postsContainer.getSelectedPosts()
      }));
    },

    onRender: function() {
      this.showChildViews();
    },

    onClickRefreshLink: function(e) {

      var selectedReddit = store.getState().selectedReddit;

      e.preventDefault();

      dispatch(invalidateReddit(selectedReddit));

      postsContainer.fetchPostsIfNeeded();
    }
  });
});