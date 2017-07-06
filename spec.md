Tengo que tener unas devtools bien mamalonas - ver todo el state.
tienes que tener el state dividido en distintas partes

# Aciones
Las acciones unicamente pueden traer informacion y meterla al state, no pueden realizar nada mas. Para selecionar defaults, etc, se deben usar mutaciones.

-> login:called -> nomas pone loading y asi
-> login:success -> muta el estate
-> login:error -> es cachado por un handler de errores

aqui Actions.login(args)
1) despacha login:called -> pone loading = true,
2a) despacha loading:success -> pone loading = false, mete data al state,
2b) despacha loading:error -> pone loading = false, mete error al state.error.

# Mutaciones
Las mutaciones se encargan de mutar directamente el estado, son cosas que no requieren data de ningun lado y son funcinoes puras.
Es necesario que las mutaciones, en caso de interactuar con algo del state ya existente no repita informacion. Hay que visualizar el state como una base de datos nosql, y hay que normalizar en este caso lo mas posible.

Mutations.setActiveUser('chava')
1) -> agarra el objeto de users del state,
2) -> encuentra a chava
3) -> pone el activeUserId como chava
{
  setActiveUser: function (state, {id} = payload){
    state.set('activeUserId', id);
  }
}

# Getters
Los getters son la unica manera en la que puedes accesar al estado. Aqui, puedes seleccionar que propiedades exponer a los getters. Esto es necesario para mantener el notifications system eficiente y no meter todo. Ademas, puedes realizar filtros y y querys complejos para evitar guardar mucha informacion repetida en el state. A estos, les puedes poner si notifica o no para acelerar el sistema.

### Exposable properties
Estas te permiten exponer cosas especificas del state, pero no se recomienda por que te lleva a repetir codigo y asi creo.
ExposableProperties = ['users'];

### filtros
Getters.activeUser
1) agarra el activeUserID, hace un filtro en users, devuelve eso.

Getters.availableUsers
2) filtra todos los users y devuelve los nombres

Estos guardan de lo que dependian y se refrezcan al cambiar.


# State change observers
- Puedes hacer un observer al store para tener los cambios que se realizaron con cada mutacion y accion.
```
store.subscribe(_ => ());
```
- Tambien te puedes subscribir a ciertos paths cuando estos cambien
```
store.subscribeTo('path' => getter;
```
Por ejemplo, store.subscribeTo('activeUser', getter)

# Modulos
Tu state tiene modulos por cada parte logica. Estos tienen sus propios actions, mutations, setters y asi.

---
# Project structure
### /Modulos
- Modulo de deteccion de cambios. (Copiando el set de polymer para mutar el state supongo)
- Modulo para definir un modulo
- Modulo para definir las acciones
- Modulo para mutators
- Modulo para definir los getters
  - Modulo para filters y exposedProps
- Modulo para subscribirte
### /Tests


---
# Api
```

//store:
//initalState, es el inicialState, mutators tipo en redux donde aparece cada constante y que hace.
//actions igual

en redux, tienes tus 'mutators' en el reducer y 'actions' en actions lol


new Store(initialState, muttators, accions)
//exports test = reducer
import { test } from '/stores/test';

store = Tefloon.combinedStore({
  test
})

```

esta chido por que aqui mismo te das cuenta de las mutaciones especificas.

mutators: {
  'SET_ACTIVE_USER': ({set} = state, payload) => {
    set({ activeUserId: payload.id });
  }
}
```

en set pasa esto, internamente ya notifica
```
  (state esta en el closure)
  set(payload) => {
    forEach prop->
      state[prop.key] = prop.val
      store.notify('activeUserId');

  }
```
