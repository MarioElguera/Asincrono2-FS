module.exports = {
    MODE: process.env.MODE || 'production',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/User',
    PORT: process.env.PORT || 5000,
}