# Mongoose writeOpResult que es?

Es lo que devuelve mongoose despues de hacer una operacion de update.

Si no se realiza ninguna actualización devuelve lo siguiente:
```json
{ n: 0, nModified: 0, ok: 1 } }
```
Si modifica 1 devuelve lo siguiente
```json
{ n: 1, nModified: 1, ok: 1 } }
```
