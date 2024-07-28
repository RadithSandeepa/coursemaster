import express from "express";
import { count, login, logout, register } from "../controllers/auth.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router(); 

//ONLY ADMIN CAN ADD USERS TO THE SYSTEM --
router.post("/register",verifyAdmin, register);

//LOGIN--
router.post("/login", login);

//LOGOUT--
router.post("/logout", logout);

//COUNT--
router.get("/count", verifyAdmin, count);


export default router;