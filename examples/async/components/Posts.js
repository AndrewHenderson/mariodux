define(function(require) {

  'use strict';

  var Marionette = require('marionette');
  var store = require('store');

  var Post = Marionette.ItemView.extend({

    tagName: 'li',

    template: function(props) {
      return props.title;
    },

    attributes: function() {
      return {
        'data-cid': this.cid
      }
    }

  });

  var EmptyView = Marionette.ItemView.extend({

    tagName: 'h2',

    template: function() {

      var state = store.getState();
      var selectedReddit = state.selectedReddit;
      var postsByReddit = state.postsByReddit;
      var selectedPosts = postsByReddit[selectedReddit];
      var isFetching = selectedPosts && selectedPosts.isFetching;

      if (isFetching) {
        return 'Loading...';
      } else {
        return 'Empty.';
      }
    }

  });

  return Marionette.CollectionView.extend({

    tagName: 'ul',

    childView: Post,

    emptyView: EmptyView,

    onRender: function() {

      var state = store.getState();
      var selectedReddit = state.selectedReddit;
      var postsByReddit = state.postsByReddit;
      var selectedPosts = postsByReddit[selectedReddit];

      if (selectedPosts && selectedPosts.isFetching) {
        this.$el.css({ opacity: 0.5 });
      }
    },

    attributes: function() {
      return {
        'data-cid': this.cid
      }
    }
  });
});