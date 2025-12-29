import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getStreamToken } from "../controllers/chat.controller.js";

const router = express.Router()

router.get("/tokens", protectRoute ,getStreamToken);

export default router;
