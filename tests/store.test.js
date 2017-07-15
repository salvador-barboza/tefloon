const Store = require('../src/store.js');

//todo: make real tests
test('Should commit and dispatch', () => {
  let initialState = {
    name: 'Paul',
    apellido: 'Gilbert',
    sencillos: [
      {
        name: 'Get out of my Yard',
        year: '2012',
        reviews: [
          {
            id: 1,
            text: 'Very great album'
          }
        ]
      }
    ]
  }

  let mutations = {
    setName: (state, name) => {
      state.set('name', name);
    }
  }

  let actions = {
    fetchNameFromNetwork: (state) => {
      return new Promise((resolve, reject) => {
        state.commit('setName', 'niniFromNetwork');
        resolve();
      });
    }
  }

  let store = new Store(initialState, mutations, actions);
  store.commit('setName', 'nini');
  expect(store.state.name).toEqual('nini');

  store.dispatch('fetchNameFromNetwork').then(_ => {
    expect(store.state.name).toEqual('niniFromNetwork');
  });

  // store.observe('name', (val) => {
  //   expect(store.state.name).toEqual('niniFromObserver');
  // });

  // store.commit('setName', 'niniFromObserver');

});