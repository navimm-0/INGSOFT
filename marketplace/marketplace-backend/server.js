// server.js
require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
// Importar otras rutas más adelante...

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Habilita Express para leer JSON en el body

// Rutas de la API
app.use('/api/v1/auth', authRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});