define(function(require) {

  'use strict';

  var Marionette = require('marionette');
  var store = require('store');

  var Post = Marionette.ItemView.extend({

    tagName: 'li',

    template: function(props) {
      return props.title;
    }

  });

  var EmptyView = Marionette.ItemView.extend({

    tagName: 'h2',

    template: function() {

      var state = store.getState();
      var isFetching = state.isFetching;

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

    emptyView: EmptyView

  });
});