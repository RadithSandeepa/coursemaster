import express from "express";
import { verifyAdmin, verifyFaculty } from "../utils/verifyToken.js";
import { addNotification, deleteNotification, getAllNotifications, getNotificationByID, updateNotificationData } from "../controllers/notification.js";

const router = express.Router();

//CREATE--
router.post("/",verifyFaculty ,addNotification);

//UPDATE--
router.put("/:id",verifyAdmin, updateNotificationData);

//DELETE--
router.delete("/:id",verifyAdmin, deleteNotification);

//GET --
router.get("/:id", getNotificationByID);

//GET ALL--
router.get("/", getAllNotifications);

export default router;