define(function(require) {

  'use strict';

  var Backbone = require('backbone');
  var store = require('store');
  var dispatch = store.dispatch;
  var requestPosts = require('actions/index').requestPosts;
  var receivePosts = require('actions/index').receivePosts;

  var Posts = Backbone.Collection.extend({

    url: function() {

      var selectedReddit = store.getState().selectedReddit;

      return 'https://www.reddit.com/r/' + selectedReddit + '.json';
    },

    fetchPostsIfNeeded: function() {

      var state = store.getState();
      var selectedReddit = state.selectedReddit;
      var postsByReddit = state.postsByReddit;
      var selectedPosts = postsByReddit[selectedReddit];

      if (_.isUndefined(selectedPosts) || !selectedPosts.isFetching) {

        dispatch(requestPosts(selectedReddit));

        return this.fetch({
          context: this
        }).done(function() {
          dispatch(receivePosts(selectedReddit, this.toJSON()));
        })
      } else {
        return true;
      }
    },

    parse: function(response) {

      return response.data.children.map(function(child){

        return child.data;
      })
    }
  });

  return new Posts();
});