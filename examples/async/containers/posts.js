define(function(require) {

  'use strict';

  var Backbone = require('backbone');
  var store = require('store');
  var dispatch = store.dispatch;
  var requestPosts = require('actions/index').requestPosts;
  var receivePosts = require('actions/index').receivePosts;
  var cache = {};

  var Posts = Backbone.Collection.extend({

    url: function() {

      var selectedReddit = store.getState().selectedReddit;

      return 'https://www.reddit.com/r/' + selectedReddit + '.json';
    },

    parse: function(response) {

      return response.data.children.map(function(child){

        return child.data;
      })
    }
  });

  return {

    getSelectedPosts: function() {

      var state = store.getState();
      var selectedItems = [];
      var selectedReddit = state.selectedReddit;
      var postsByReddit = state.postsByReddit;
      var selectedPosts = postsByReddit[selectedReddit];
      var collection = cache[selectedReddit] = cache[selectedReddit] || new Posts();

      if (selectedPosts) {
        selectedItems = selectedPosts.items;
      }

      collection.add(selectedItems);

      return collection;
    },

    fetchPostsIfNeeded: function() {

      var state = store.getState();
      var selectedReddit = state.selectedReddit;
      var postsByReddit = state.postsByReddit;
      var selectedPosts = postsByReddit[selectedReddit];
      var isSelectedInvalid = selectedPosts && selectedPosts.didInvalidate;
      var collection = this.getSelectedPosts();

      var shouldFetchPosts = isSelectedInvalid ||
        (collection.isEmpty() && (_.isUndefined(selectedPosts) || !selectedPosts.isFetching));

      if (shouldFetchPosts) {

        dispatch(requestPosts(selectedReddit));

        collection.fetch()
          .done(function onDoneFetchingPosts() {
            dispatch(receivePosts(selectedReddit, collection.toJSON()));
          });
      }
    }
  }
});