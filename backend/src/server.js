import express from "express";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

const app = express();

const startServer = async () =>{
    try {
        console.log("\n\n") 
        await connectDB();
        app.listen(ENV.PORT, () =>{
            console.log(`Server is running on PORT: ${ENV.PORT}\n\n`);
        })
    } catch (error) {
        console.log("💣 Error connecting to the server: ", error);
    }
}

startServer();
