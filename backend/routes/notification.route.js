import express from "express";
import { protectRoute } from "../middleware/protectRoute";
import { deleteNotification, getNotifications } from "../controllers/notification.controller";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotification);

export default router;