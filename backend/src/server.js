import express from "express";
import cors from "cors"
import { serve } from "inngest/express";

import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { inngest, functions } from "./lib/inngest.js";

const app = express();


//middleware
if(!ENV.FRONT_END_URL){
    console.log("❌ FRONT_END_URL is not defined in environment variables")
    process.exit(1) //failure
}
app.use(express.json());
app.use(cors({
    origin: ENV.FRONT_END_URL,
    credentials: true
}));

app.use("/api/inngest", serve({client:inngest, functions}));

if(!process.env.VERCEL){

    const startServer = async () =>{
        try {
            if(!ENV.DB_URL){
                throw new Error("DB_URL is not defined in environment variables")
            }
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


}

export default app;
