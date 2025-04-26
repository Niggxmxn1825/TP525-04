const express = require('express');
const router = express.Router();

// Ejemplo de ruta básica
router.get('/', (req, res) => {
  res.json({ message: "API de productos funcionando" });
});

// Exportación CORRECTA
module.exports = router;