"use strict";
const { Map, fromJS } = require("immutable");

const resolveStatePath = function(path) {
  return path.split(".");
};


const notify = function(path, value) {
  if (subscribers[path]) {
    subscribers[path].forEach(s => {
      s(value);
    });
  }
};

let Store = function(initialState, mutations, actions) {
  this.mutationMap = new Map(mutations);
  this.actionMap = new Map(actions);
  this.subscribers = {};

  this._prevState = undefined;
  this._state = fromJS(initialState);

  Object.defineProperty(this, "state", { get: () => this._state.toJS() });
  Object.defineProperty(this, "prevState", { get: () => this._prevState.toJS() });
};

Store.prototype.dispatch = function(actionType, payload) {
  let action = this.actionMap.get(actionType);
  if (action) {
    action.call(this, { commit: this.commit.bind(this) }, payload);
  } else {
    console.warn(`Action ${actionType} is not registered.`);
  }
};

Store.prototype.commit = function(mutationType, payload) {
  const set = (path, val) => {
    this._prevState = this._state;
    this._state = this._state.setIn(resolveStatePath(path), val);
    // if (this._prevState !== this._state) {
    //   notify(path, val);
    // }
  };

  let mutation = this.mutationMap.get(mutationType);
  if (mutation) {
    mutation({ set: set }, payload);
  } else {
    console.warn(`Mutation ${mutationType} is not registered.`);
  }
};

// Store.prototype.observe = function(path, callback) {
//   subscribers[path] = subscribers[path] || [];
//   subscribers[path].push(callback);
// };


module.exports = Store;
