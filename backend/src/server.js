import express from "express";
import cors from "cors"
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";
import path from "path";

import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { inngest, functions } from "./lib/inngest.js";
import chatRoutes from "./routes/chat.route.js";
import sessionRoutes from "./routes/session.routes.js"

const app = express();


const __dirname = path.resolve();

//middleware
if(!ENV.FRONT_END_URL){
    console.log("❌ FRONT_END_URL is not defined in environment variables")
}
app.use(express.json());
app.use(cors({
    origin: ENV.FRONT_END_URL,
    credentials: true
}));
app.use(clerkMiddleware({
        redirectToSignIn: false,
    })
); // this add auth field to request object: req.auth();

app.use("/api/inngest", serve({client:inngest, functions}));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);


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
