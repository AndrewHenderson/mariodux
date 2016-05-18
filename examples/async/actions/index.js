define(function(require) {

  var $ = require('jquery');
  var store = require('store');
  var dispatch = store.dispatch;

  function selectReddit(reddit) {
    return {
      type: 'SELECT_REDDIT',
      reddit: reddit
    };
  }

  function invalidateReddit(reddit) {
    return {
      type: 'INVALIDATE_REDDIT',
      reddit: reddit
    };
  }

  function requestPosts(reddit) {
    return {
      type: 'REQUEST_POSTS',
      reddit: reddit
    };
  }

  function receivePosts(reddit, json) {
    return {
      type: 'RECEIVE_POSTS',
      reddit: reddit,
      posts: json.data.children.map(function (child) {
        return child.data;
      }),
      receivedAt: Date.now()
    };
  }

  function fetchPosts(reddit) {
    return function (dispatch) {
      dispatch(requestPosts(reddit));
      return $.ajax({
        url: "https://www.reddit.com/r/" + reddit + ".json"
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        return dispatch(receivePosts(reddit, json));
      });
    };
  }

  function shouldFetchPosts(state, reddit) {
    var posts = state.postsByReddit[reddit];
    if (!posts) {
      return true;
    }
    if (posts.isFetching) {
      return false;
    }
    return posts.didInvalidate;
  }

  function fetchPostsIfNeeded(reddit) {
    return function (dispatch, getState) {
      if (shouldFetchPosts(getState(), reddit)) {
        return dispatch(fetchPosts(reddit));
      }
    };
  }

  return {
    selectReddit: selectReddit,
    invalidateReddit: invalidateReddit,
    fetchPostsIfNeeded: fetchPostsIfNeeded
  };
});
