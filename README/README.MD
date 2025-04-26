# Refactorización en 3 capas

## Descripción de cada capa:

- `app.js`: Es la **capa de presentación**, maneja las rutas y las respuestas al usuario.
- `logica.js`: Es la **capa de lógica de negocio**, valida y procesa los datos.
- `datos.js`: Es la **capa de acceso a datos**, guarda los productos en una lista en memoria.

## Ventajas respecto a la versión monolítica:

- Mejor **organización del código**.
- Más **fácil de mantener y escalar**.
- Permite **testear por separado** cada parte.
- Se puede cambiar la lógica o el almacenamiento sin modificar la presentación.