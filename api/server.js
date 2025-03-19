const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

const { MODE, MONGO_URI, PORT, BBDD } = require('./env');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado con MONGOOSE'))
    .catch(err => console.error('Error en la conexión con MongoDB', err));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
