const express = require('express');
const productosRoutes = require('./routes/productosRoutes'); // Asegúrate de crear esta carpeta/ruta

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Configuración de rutas
app.use('/api/productos', productosRoutes);

// Opcional: Servir archivos estáticos (si mantienes el frontend HTML)
app.use(express.static('public')); // Crea una carpeta "public" para tu index.html

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API REST corriendo en http://localhost:${PORT}`);
});