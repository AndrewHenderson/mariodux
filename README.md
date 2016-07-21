# Mariodux
Demo of how [Redux](https://github.com/reactjs/redux) and [morphdom](https://github.com/patrick-steele-idem/morphdom) can be coupled with [Marionette](https://github.com/marionettejs/backbone.marionette) in order to provide the benefit of popular [React](https://github.com/facebook/react) and [Flux](https://facebook.github.io/flux/) features — specifically, DOM diffing and unidirectional data flow.

## Motivation
I currently work on a large scale Marionette application; migrating to React or any other framework would be a massive effort. I began this repo seeking to determine whether it was possible to replicate the Flux pattern within a Marionette application.

## The Approach
We start by creating [two versions of the application's root layout](https://github.com/AndrewHenderson/mariodux/blob/master/examples/todos/index.js#L15-L16).
```js
var windowRoot = new Root();
var virtualRoot = new Root();
```
The true root is attached to the document and will continue to serve as a representation of our application state.
```js
app.rootRegion.show(windowRoot);
```
The virtual root will essentially act as the worker. It will be re-rendererd when changes are made to the app's global state object. The new HTML representation will then be diffed against the representation currently in the DOM in order to make efficient updates.

## Principles
Following the [Redux principles](http://redux.js.org/docs/introduction/ThreePrinciples.html), views will leverage [pure functions](https://github.com/AndrewHenderson/mariodux/blob/master/examples/todos/reducers/todos.js#L10-L43) within reducers in order to update their models, [dispatching events](https://github.com/AndrewHenderson/mariodux/blob/master/examples/todos/components/TodoList.js#L53-L55) rather than setting properties on models directly.
```js
onClick: function() {
  dispatch(toggleTodo(this.$el.data('model').id));
}
```
In doing so, a new global state object will be generated by  [combineReducers](https://github.com/AndrewHenderson/mariodux/blob/master/examples/todos/reducers/index.js#L9-L12) and the `updateDOM` callback will execute, rendering the virutalRoot using the new global state.

An HTML representation of this latest rendering will then be diffed against the representation currently in the DOM.
```js
store.subscribe(function updateDOM() {
  var windowDOM = windowRoot.$el[0];
  var virtualDOM = virtualRoot.render().$el[0];
  morphdom(windowDOM, virtualDOM);
});
```
**The true root will not be re-rendered.** It is only rendered once at the beginning. From then on, morphdom will handle all future updates.

## Shift In Mindset

This approach largely ignores the event systems provided in Backbone and Marionette in favor of a single dispatcher and pure functions. **Using this approach, views should only be concerned with rendering and dispatching.**

## Gotchas
### Overriding Marionette's DOM management
Since morpdom is now tasked with managing the DOM, we override Marionette's `ChildView.remove`. Doing so allows morphdom to update the DOM efficiently. This keeps morphdom from seeing more additions than is actually necessary.
### Discreet Event Listeners
As an alternative to the complexities of [React's synthetic event system](https://facebook.github.io/react/docs/working-with-the-browser.html), DOM event listeners will continue to reside in  the [view's events](https://github.com/AndrewHenderson/mariodux/blob/master/examples/todos/components/TodoList.js#L30-L32).
```js
events: {
  click: 'onClick'
}
```
One particular issue that arises when coupling discreet event listeners with DOM diffing is that the DOM node may be presenting data which is not part the view's model.

This is most apparent in the provided [async example](https://github.com/AndrewHenderson/mariodux/tree/master/examples/async) where views hold reference to thier `li` nodes whose text may have been replaced by morphdom. At this point, the view's node is presenting data that is not in the view's model.

**Workaround:**

In order to ensure the dispatcher is provided the correct `model.id`, we store the model on the node using the jQuery data property, `model`. This way, [the proper id can be used when notifying the dispatcher](https://github.com/AndrewHenderson/mariodux/blob/master/examples/todos/components/TodoList.js#L54).
```js
dispatch(toggleTodo(this.$el.data('model').id));
```
### Persisting Browser State
If we need to reference the node currently in the DOM before updating, we can leverage morphdom's [`onBeforeElUpdated`](https://github.com/AndrewHenderson/mariodux/blob/master/examples/todos/index.js#L29-L32).
```js
morphdom(windowDOM, virtualDOM, {
  onBeforeElUpdated: function(fromEl, toEl) {
    if (fromEl.hasAttribute('ref')) {
      $(toEl).trigger('before:update', fromEl);
    }
  }
});
```
 We'll then set up a matching [event listener in the view](https://github.com/AndrewHenderson/mariodux/blob/master/examples/todos/components/AddTodo.js#L32-L35). This is useful when needing to maintain things like the text currently typed into an `input` field.
```js
onBeforeUpdateInput: function(e, fromEl) {
  var $fromEl = $(fromEl);
  this.ui.input.val($fromEl.val());
}
```
### Node onAttach
If the view needs to know when its node has been attached to the document, we can leverage morphdom's [`onNodeAdded`](
https://github.com/AndrewHenderson/mariodux/blob/master/examples/async/index.js#L26-L30), again [listening for our custom event in the view](https://github.com/AndrewHenderson/mariodux/blob/master/examples/async/components/Posts.js#L14-L16).
```js
morphdom(windowDOM, virtualDOM, {
  onNodeAdded: function(node) {
    if (node.hasAttribute('ref')) {
      $(node).trigger('added', node);
    }
  }
});
```
You'll notice we've followed suit to React and tagged desired nodes with the [`ref` attribute](https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute) in order to specify when to trigger the event.
