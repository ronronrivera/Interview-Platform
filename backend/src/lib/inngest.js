import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/user.model.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({id: "interview-platform"});

const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event: "clerk/user.created"},
    async ({event}) =>{
        try {
            await connectDB();

            const {id, email_addresses, first_name, last_name, image_url} = event.data || {};

            const email = email_addresses?.[0]?.email_address || null;
            const name = `${first_name || ""} ${last_name || ""}`.trim() || "Unknown";

            const newUser = {
                clerkId: id,
                email,
                name,
                profileImage: image_url
            }

            const created = await User.create(newUser);
            console.log("✅ User created:", created._id);
            
            await upsertStreamUser({
                id:newUser.clerkId.toString(),
                name: newUser.name,
                image: newUser.profileImage,
            });

        } catch (err) {
            console.error("❌ syncUser error:", err);
            throw err; // rethrow so Inngest registers the failure and you can see it in logs
        }
    }
)

const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-from-db"},
    {event: "clerk/user.deleted"},
    async ({event}) =>{
        try {
            console.log(" deleteUserFromDB event:", JSON.stringify(event, null, 2));
            await connectDB();

            const {id} = event.data || {};

            const res = await User.deleteOne({clerkId: id});
            console.log("✅ deleteUserFromDB result:", res);

            await deleteStreamUser(id.toString());
        } catch (err) {
            console.error("❌ deleteUserFromDB error:", err);
            throw err;
        }
    }
)

export const functions = [syncUser, deleteUserFromDB];
