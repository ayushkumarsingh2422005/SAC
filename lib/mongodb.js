import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is not defined in .env.local");
}

// Prevent multiple connections in development
let cached = global.mongoose || { conn: null, promise: null };

export async function connectToDB() {
    if (cached.conn) return cached.conn; // Use existing connection

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, {
                dbName: "myDatabase", // Optional: Set your database name
            })
            .then((mongoose) => {
                console.log("✅ MongoDB connected successfully!");
                return mongoose;
            })
            .catch((error) => {
                console.error("❌ MongoDB connection error:", error);
                process.exit(1);
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

global.mongoose = cached;
