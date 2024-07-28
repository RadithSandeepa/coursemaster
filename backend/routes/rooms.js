import express from "express";
import { addRoom, deleteRoom, getAllRooms, getRoomByID, updateRoomData } from "../controllers/room.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE--
router.post("/",verifyAdmin ,addRoom);

//UPDATE--
router.put("/:id",verifyAdmin, updateRoomData);

//DELETE--
router.delete("/:id",verifyAdmin, deleteRoom);

//GET --
router.get("/:id", getRoomByID);

//GET ALL--
router.get("/",  getAllRooms);

export default router;