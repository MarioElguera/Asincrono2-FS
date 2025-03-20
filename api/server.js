const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const { MODE, MONGO_URI, PORT } = require('./env');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB conectado con MONGOOSE'))
    .catch(err => {
        console.error('❌ Error en la conexión con MongoDB:', err);
        process.exit(1);
    });

app.use('/', authRoutes);

// middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});

// Iniciar servidor (Vercel maneja el puerto automáticamente)
module.exports = app;

// app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
