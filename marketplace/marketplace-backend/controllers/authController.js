// /controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// Función para el registro de usuarios
const register = async (req, res) => {
  const { email, password, rol } = req.body;

  if (!['admin', 'restaurante', 'cliente'].includes(rol)) {
    return res.status(400).json({ error: 'Rol inválido' });
  }

  try {
    const password_hash = await bcrypt.hash(password, saltRounds);

    const result = await db.query(
      'INSERT INTO usuarios (email, password_hash, rol) VALUES ($1, $2, $3) RETURNING id, email, rol',
      [email, password_hash, rol]
    );

    // Generar un token JWT inmediatamente después del registro
    const token = jwt.sign(
      { id: result.rows[0].id, rol: rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      token: token,
      usuario: result.rows[0]
    });
  } catch (err) {
    if (err.code === '23505') { // Código de error de duplicado en PostgreSQL
        return res.status(409).json({ error: 'El email ya está registrado' });
    }
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar funciones (aquí se añadiría 'login' más adelante)
module.exports = {
  register,
};