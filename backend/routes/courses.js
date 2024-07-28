import express from "express";
import { addCourse, assignFacultyToCourse, deleteCourse, getAllCourses, getApprovedCourses, getAssignedCourses, getCourseByID, getCourseIds, updateCourseData } from "../controllers/course.js";
import { verifyAdmin, verifyOnlyFaculty, verifyOnlyUserStudent, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE--
router.post("/",verifyAdmin ,addCourse);

//UPDATE--
router.put("/:id",verifyAdmin, updateCourseData);

//DELETE--
router.delete("/:id",verifyAdmin, deleteCourse);

//GET --
router.get("/:id", getCourseByID);

//GET ALL--
router.get("/",  getAllCourses);

//ASSIGN FACULTY MEMBER TO COURSE(ADMIN TASK)--
router.post('/:id/assign-faculty', verifyAdmin, assignFacultyToCourse);

// GET ASSIGNED COURSES FOR FACULTY MEMBER(FACULTY TASK)
router.get('/:id/assigned',verifyUser, verifyOnlyFaculty, getAssignedCourses);

//GET ENROLLED COURSES(STUDENT TASK)
router.get('/:id/mycourses', verifyOnlyUserStudent, getApprovedCourses);

//ADD WEEKLY CONTENTS TO ASSIGNED COURSES(FACULTY TASK) IMPLEMENT LATER...
router.put('/:id/assigned/:courseId/add content');

//GET COURSE IDS--
router.get('/get/codes', verifyAdmin, getCourseIds);

export default router;