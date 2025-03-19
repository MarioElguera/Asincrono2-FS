module.exports = {
    MODE: process.env.MODE || 'dev',
    MONGO_URI: process.env.MONGO_URI || '127.0.0.1',
    PORT: process.env.PORT || 5000,
    BBDD: process.env.BBDD || 'nombre-bbdd'
}