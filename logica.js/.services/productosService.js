const productosRepository = require('../repositories/productosRepository');

// Servicio para obtener todos los productos
const obtenerTodos = async () => {
    // 1. Llamar al repositorio (acceso a datos)
    const productos = await productosRepository.obtenerTodos();
    
    // 2. (Opcional) Aplicar reglas de negocio/transformaciones
    // Ejemplo: Filtrar productos activos, calcular estadísticas, etc.
    return productos;
};

// Servicio para agregar un nuevo producto
const crear = async (nombre) => {
    // 1. Validaciones (lógica de negocio)
    if (!nombre || typeof nombre !== 'string') {
        throw new Error('El nombre debe ser un texto válido');
    }

    if (nombre.trim() === '') {
        throw new Error('El nombre no puede estar vacío');
    }

    // 2. (Opcional) Transformaciones
    const nombreFormateado = nombre.trim().toLowerCase();

    // 3. Llamar al repositorio para guardar
    const nuevoProducto = await productosRepository.crear(nombreFormateado);

    // 4. Retornar resultado (puede incluir lógica adicional)
    return nuevoProducto;
};

module.exports = {
    obtenerTodos,
    crear
};