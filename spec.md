
# Acciones
Las acciones unicamente pueden traer información y meterla al estado, no pueden realizar nada más. Para seleccionar defaults, etc, se deben usar mutaciones.

-> `login:called` -> solamente pone loading
-> `login:success` -> muta el estado
-> `login:error` -> es cachado por un manejador de errores

aquí Actions.login(args)
1) despacha `login:called` -> pone `loading = true`,
2a) despacha `loading:success` -> pone `loading = false`, mete datos al estado,
2b) despacha `loading:error` -> pone `loading = false`, mete un error en `state.error`.

# Mutaciones
Las mutaciones se encargan de modificar directamente el estado, son cosas que no requieren data de ningun lado y son funciones puras.
Es necesario que las mutaciones, en caso de interactuar con alguna propiedad del estado ya existente, no repitan informacion. Hay que visualizar el estado como una base de datos nosql, y hay que denormalizar en este caso lo más posible.

```javascript
Mutations.setActiveUser('chava')
```
1) -> agarra el objeto de users del state,
2) -> encuentra a `'chava'`,
3) -> pone el activeUserId como `'chava'`.
```javascript
{
  setActiveUser: function (state, {id} = payload){
    state.set('activeUserId', id);
  }
}
```

# Getters
Los getters son la única manera en la que puedes accesar al estado. Aquí puedes seleccionar qué propiedades exponer a los getters. Esto es necesario para mantener el notifications system eficiente y no introducir todas las propiedades del estado en él. Además, puedes crear filtros y querys complejos para evitar guardar mucha información repetida en el estado. A estos les puedes poner si deben generar notificaciones o no, para acelerar el sistema.

### Exposable properties
Estas te permiten exponer cosas específicas del estado. Se debe tener cuidado de cuándo son apropiadas de usar, y cuándo es mejor un getter para evitar repetir código.
```javascript
ExposableProperties = ['users'];
```

### Filtros
```javascript
Getters.activeUser
```
1) agarra el activeUserID, crea un filtro en `users`, devuelve el resultado.

```javascript
Getters.availableUsers
```
2) filtra todos los usuarios y devuelve los nombres.

Estos guardan la informacioón de la que dependen y se refrezcan cuando esta cambia.


# State change observers
- Puedes crear un observer para obtener los cambios que se realizaron al estado con cada mutación y acción.
```javascript
store.subscribe(_ => ());
```
- Tambien te puedes suscribir a los cambios sobre un path específico.
```javascript
store.subscribeTo('activeUser', getter);
```

# Modulos
El estado tiene módulos por cada parte lógica. Estos tienen sus propios actions, mutations, getters, etc.

---
# Project structure
### /Modules
- Módulo de detección de cambios. (Copiando el set de polymer para mutar el state supongo)
- Módulo para definir un módulo
- Módulo para definir las acciones
- Módulo para mutators
- Módulo para definir los getters
- Módulo para filters y exposedProps
- Módulo para subscribirte
### /Tests
<!--- TODO(chava): redactar el diseño para las pruebas unitarias y de integración --->

---
# API
## Store
```javascript
new Store(initialState, muttators, accions)
import { test } from '/stores/test';

store = Tefloon.combinedStore({
  test
})

```

## Mutators
```javascript
mutators: {
  'SET_ACTIVE_USER': ({set} = state, payload) => {
    set({ activeUserId: payload.id });
  }
}
```
