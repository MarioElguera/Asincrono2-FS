const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const { MODE, MONGO_URI, PORT, BBDD } = require('./env');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado con MONGOOSE'))
    .catch(err => console.error('Error en la conexión con MongoDB', err));

app.use('/', authRoutes);

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
