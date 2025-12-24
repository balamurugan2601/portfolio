
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    // Warn only in development, error in production would be better but we want to fail gracefully if env var is missing during build
    if (process.env.NODE_ENV === 'production') {
        console.warn('Please define the MONGODB_URI environment variable inside .env.local');
    }
}

interface Cached {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: Cached;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGODB_URI) {
        // Fallback for build time or if user hasn't set it yet, to prevent crash on import
        // Real connection will fail, but this allows code to compile.
        return null;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
