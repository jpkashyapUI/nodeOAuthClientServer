const mysql = require('mysql2/promise');

const connectDB = async () => {
    // Create the connection to database

    try {
        const connection = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'social',
        port: process.env.DB_PORT || 3306
    });

    if (connection.state === 'connected') {
        console.log('Database connection is established');
    } else {
        console.log('Database connection is not established');
    }

    return connection;
    } catch (error) {
        console.log(error)
    }

}

module.exports = connectDB;