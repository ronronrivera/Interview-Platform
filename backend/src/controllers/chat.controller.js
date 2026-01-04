import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res){
    try {
        // use clerkId for stream (not mongoDB) 
        const token = chatClient.createToken(req.user.clerkId);
        res.status(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.profileImage, 
        });
    } catch (error) {
        console.error("Error in getStreamToken function: ", error);
        res.status(500).json({msg: "Internal server error"})
    }
}
