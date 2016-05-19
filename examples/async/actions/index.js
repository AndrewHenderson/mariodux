define(function() {

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

  function receivePosts(reddit, posts) {
    return {
      type: 'RECEIVE_POSTS',
      reddit: reddit,
      posts: posts,
      receivedAt: Date.now()
    };
  }

  return {
    selectReddit: selectReddit,
    invalidateReddit: invalidateReddit,
    requestPosts: requestPosts,
    receivePosts: receivePosts
  };
});
