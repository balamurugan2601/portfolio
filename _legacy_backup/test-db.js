const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Manually parse .env since we might not have dotenv installed locally
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = envContent.split('\n').reduce((acc, line) => {
    const firstEqual = line.indexOf('=');
    if (firstEqual > -1) {
        const key = line.substring(0, firstEqual).trim();
        const value = line.substring(firstEqual + 1).trim();
        acc[key] = value;
    }
    return acc;
}, {});

const MONGODB_URI = envVars.MONGODB_URI;

console.log('Testing MongoDB connection...');
console.log('URI:', MONGODB_URI ? MONGODB_URI.replace(/:([^:@]+)@/, ':****@') : 'undefined'); // Mask password

if (!MONGODB_URI) {
    console.error('MONGODB_URI not found in .env');
    process.exit(1);
}

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('Successfully connected to MongoDB!');
        console.log('State:', mongoose.connection.readyState);
        return mongoose.connection.db.admin().ping();
    })
    .then(() => {
        console.log('Ping successful!');
        process.exit(0);
    })
    .catch((err) => {
        console.log('CONN_ERR:' + err.name + ':' + err.message);
        process.exit(1);
    });
