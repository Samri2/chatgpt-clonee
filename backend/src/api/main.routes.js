import express from "express";
import chatRouter from "./chat/chatRoutes.js";
import adminRouter from "./admin/adminRoutes.js";
const mainRouter = express.Router();

// Conversation routes
mainRouter.use("/chat",chatRouter);
// Admin routes
mainRouter.use("/admin", adminRouter);
export default mainRouter;