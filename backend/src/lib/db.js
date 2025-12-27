import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            // already connected (1 = connected, 2 = connecting)
            console.log("ℹ️ MongoDB already connected");
            return;
        }

        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("✅ Connected to mongoDB: ", conn.connection.host);

    } catch (error) {
        console.log("❌ Failed to connect to mongoDB\n\n")
        console.log("Likely cause by: ", error);

        process.exit(1); //failure
    }
}


