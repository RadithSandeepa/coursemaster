import express from "express";
import { deleteUser, getAllUsers, getFacultyMemberIds, getStudentIds, getUserByID, updatePassword, updateUserData } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE--
router.put("/:id", verifyUser,updateUserData);

//UPDATE PASSWORD--
router.put("/:id/update-password", verifyUser, updatePassword);

//DELETE--
router.delete("/:id",verifyUser, deleteUser);

//GET --
router.get("/:id",verifyUser ,getUserByID);

//GET ALL--
router.get("/",verifyAdmin, getAllUsers);

//GET FACULTY MEMBER IDS--
router.get("/get/faculty",verifyAdmin, getFacultyMemberIds);

//GET STUDENT MEMBER IDS--
router.get("/get/students",verifyAdmin, getStudentIds);

export default router;