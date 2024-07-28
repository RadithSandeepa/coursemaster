import express from "express";
import { addEnrollment, deleteEnrollment, enrollInCourse, getAllEnrollments, getEnrollmentByID, getPendingEnrollments, resolveEnrollment, updateEnrollment } from "../controllers/enrollment.js";
import { verifyAdmin, verifyOnlyStudent} from "../utils/verifyToken.js";

const router = express.Router();

//CREATE--
router.post("/",verifyAdmin ,addEnrollment);

//UPDATE--
router.put("/:id",verifyAdmin, updateEnrollment);

//DELETE--
router.delete("/:id",verifyAdmin, deleteEnrollment);

//GET --
router.get("/:id",verifyAdmin, getEnrollmentByID);
  
//GET ALL--
router.get("/", verifyAdmin, getAllEnrollments);

//STUDENT ENROLL TO THE COURSE
router.post('/:courseId/enroll', verifyOnlyStudent, enrollInCourse);

//GET PENDING ENROLLMENTS(ADMIN TASK)--
router.get('/check/pending',verifyAdmin, getPendingEnrollments);

//RESOLVE ENROLLMENT STATUS(ADMIN TASK)--
router.put('/pending/:id/resolve',verifyAdmin, resolveEnrollment);

export default router;