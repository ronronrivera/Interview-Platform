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
app.use(clerkMiddleware()); // this add auth field to request object: req.auth();


app.use("/api/inngest", serve({client:inngest, functions}));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// SPA fallback - send index.html for any unknown GET route (use regex to avoid path-to-regexp issues)
app.get(/.*/, (req, res) => {
  // Only respond with index.html for requests that accept HTML
  if (!req.accepts || !req.accepts('html')) return res.status(404).end();
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
    } catch (error) {
        console.error("💥 Error starting the server", error);
    }
};

startServer();

