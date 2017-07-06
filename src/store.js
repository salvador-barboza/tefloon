'use strict';

const set = function (state) {
  return function (propName, propVal) {
    state[propName] = propVal;
  }
}


const Store = function(initialState, mutators) {
  let state =  Object.assign({}, initialState);

  const commit = function(mutationType, payload) {
    console.log(mutators[mutationType]);
    mutators[mutationType].call(this, {set: set(state)}, payload)
  }

  return {
    state,
    // dispatch,
    commit
  };
}


module.exports = Store;