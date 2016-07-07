define(function(require) {

  'use strict';

  var Marionette = require('marionette');
  var store = require('store');

  var Post = Marionette.ItemView.extend({

    tagName: 'li',

    // FOR DEMO PURPOSES ONLY
    // Listen for when a node is added to the DOM, in lieu of "onAttach" event
    events: {
      'added': 'onAdded',
      'click': 'onClick'
    },

    // FOR DEMO PURPOSES ONLY
    attributes: {
      ref: ''
    },

    template: function(props) {
      return props.title;
    },

    // Override to bypass the removal of view.el from the DOM
    remove: function() {
      this.stopListening();
      return this;
    },

    onRender: function() {
      this.$el.data('model', this.model);
    },

    // FOR DEMO PURPOSES ONLY
    onAdded: function(e, node) {
      //console.log(this.$el.position('top'));
    },

    onClick: function() {
      this.$el.css({textDecoration: 'line-through'});
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
    }

  });
});