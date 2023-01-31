require('dotenv').config()
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001
const URI_MONGODB = process.env.URI_MONGODB
const DB_NAME = process.env.DB_NAME || "anime-tv-addon-db"

async function connect() {
    try {
        const mongouri = `${URI_MONGODB}/${DB_NAME}`
        await mongoose.connect(mongouri)
        return mongouri
    } catch (err) {
        throw new Error(`Could not connect to db 'mongodb://${URI_MONGODB}/${DB_NAME}': ${err}`)
    }
}

module.exports = {
    connect,
    PORT,
    URI_MONGODB,
    DB_NAME
}