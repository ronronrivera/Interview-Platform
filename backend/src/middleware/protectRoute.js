import { requireAuth } from "@clerk/express";
import User from "../models/user.model.js";

export const protectRoute = [
    requireAuth({signInUrl: "/sign-in"}),
    async (req, res, next) =>{
        try {
            const clerkId = req.auth().userId;
            if(!clerkId) return res.status(401).json({msg: "Unauthorized - Invalid Token"});
            
            // find user in db by clerkId
            const user = await User.findOne({clerkId});

            if(!user) return res.status(404).json({msg: "User not found"});
            
            //attach user to request
            req.user = user;

            next();
                
        } catch (error) {
            console.error("Error in protect route middleware", error);
            res.status(500).json({msg: "Internal server error"});
        }
    }
]
