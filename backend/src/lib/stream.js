import { StreamChat } from "stream-chat"
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("❌ STREAM_API_KEY or STREAM_API_SECRET IS MISSING");
}

 

export const streamClient = new StreamClient(apiKey, apiSecret); // video call features
export const chatClient = StreamChat.getInstance(apiKey, apiSecret); //chat features

export const upsertStreamUser = async(userData) =>{
    try {
        await chatClient.upsertUser(userData);
        console.log("✅ Stream user deleted successfully: ", userId);

    } catch (error) {
        console.log("❌ Error upserting Stream user\n", error)
    }
}

export const deleteStreamUser = async(userId) =>{
    try {
        await chatClient.deleteUser(userId)
        console.log("✅ Stream user deleted successfully: ", userId);
    } catch (error) {
        console.log("❌ Error deleting Stream user\n", error)
    }
}

