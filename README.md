# BitSplit

_Mobile Grupo 1 Proyecto de Especialidad 2020-1_

Para publicar una nueva version en produccción
```
expo publish --release -channel prod
```
Para publicar una nueva versio en staging
```
expo publish
```
App de prueba: https://expo.io/@isavega/Bitsplit

### Require Cycle Warning

Existe un warning debido a un requerimientos circulares. Aunque está bien manejado, el warning puede aparecer de todas formas.

>Require cycle: store/index.js -> store/sagas.js -> store/auth/saga.js -> utils/api/index.js -> utils/api/auth/index.js -> utils/api/authedAxios.js -> store/index.js
Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.
Si desean eliminar este warning acá hay una forma de hacerlo. 

https://stackoverflow.com/questions/55391879/prevent-require-cycle-warnings-on-terminal 

## Autores ✒️

* **Diego Silva** - *Developer* - [DiegoSilvaS](https://github.com/DiegoSilvaS)
* **Isabel Vega** - *Developer* - [isavega](https://github.com/isavega)
