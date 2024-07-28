import express from "express";
import { addResource, deleteResource, getAllResources, getResourceByID, updateResourceData } from "../controllers/resource.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE--
router.post("/",verifyAdmin ,addResource);

//UPDATE--
router.put("/:id",verifyAdmin, updateResourceData);

//DELETE--
router.delete("/:id",verifyAdmin, deleteResource);

//GET --
router.get("/:id", getResourceByID);

//GET ALL--
router.get("/", getAllResources);

export default router;