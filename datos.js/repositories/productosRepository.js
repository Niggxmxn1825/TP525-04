// repositories/productosRepository.js
const productos = []; // ¡Mismo array que en tu datos.js original!

const obtenerTodos = async () => {
  return productos; // Equivalente a tu listarProductos()
};

const crear = async (nombre) => {
  const nuevoProducto = {
    id: productos.length + 1, // Agrego ID automático (mejora REST)
    nombre
  };
  productos.push(nuevoProducto);
  return nuevoProducto; // Retorna el objeto creado (no solo el nombre)
};

module.exports = { obtenerTodos, crear };