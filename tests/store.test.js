const Store = require('../src/store.js');

test('Should print nini', () => {
  let initialState = {
    name: 'boby',
    cancion: 'desvelado'
  }

  let mutators = {
    setName: (state, name) => {
      state.set('name', name);
    }
  }

  let store = new Store(initialState, mutators);
  expect(store).toHaveProperty('state');
  expect(store).toHaveProperty('commit');

  store.commit('setName', 'nini');
  expect(store.state.name).toEqual('nini');

});