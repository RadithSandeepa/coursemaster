import Enrollment from '../models/enrollment.js';
import Course from '../models/course.js';
import User from '../models/user.js';
import { createError } from "../utils/error.js";

// ADD NEW ENROLLMENT(ADMIN CAN ADD ENROLLMENTS TOO.. FRO SCHOLARSHIPS LIKE SCENARIO)
export const addEnrollment = async (req, res, next) => {
   
    try{
        const { studentCode, courseCode, status } = req.body;

        // Check if the student exists
        const student = await User.findOne({ Id: studentCode, role: 'S' });
        if (!student) {
            return next(createError(404, "Invalid student code"));
        }

        // Check if the course exists
        const course = await Course.findOne({ code: courseCode });
        if (!course) {
            return next(createError(404, "Invalid course code"));
        }

        // Check if the enrollment already exists
        const existingEnrollment = await Enrollment.findOne({ student: student._id, course: course._id });
        if (existingEnrollment) {
            return next(createError(404, "Enrollment already exists"));
        }

        // Create a new enrollment
        const newEnrollment = new Enrollment({
            student: student._id,
            course: course._id,
            status: status 
        });

        const savedEnrollment = await newEnrollment.save();
        res.status(201).json(savedEnrollment);
    } catch (err) {
        next(err);
    }
};

// GET ALL ENROLLMENTS
export const getAllEnrollments = async (req, res, next) => {
    try{
        const enrollmentList = await Enrollment.find();
        res.status(200).json(enrollmentList);
    } catch(err) {
        next(err);
    }
}

// GET SINGLE ENROLLMENT
export const getEnrollmentByID = async (req, res, next) => {
    try{
        const enrollment = await Enrollment.findById(req.params.id);
        res.status(200).json(enrollment);
    } catch(err){
        next(err);
    }
}

// DELETE A ENROLLMENT
export const deleteEnrollment = async (req, res, next) => {
    try {
        await Enrollment.findByIdAndDelete(req.params.id);
        res.status(200).json("Enrollment has been deleted...");
    } catch (err) {
        next(err);
    }
}

//UPDATE ENROLLLMENT
//STUDENT CANT UPDATE ENROLLMENT OR YOU CANT UPDATE A ENROLLMENT (CHECK THIS ISSUE)
//DONT IPLEMENT THIS ON FRONTEND
//NOT GET UPDATED BY CODE
export const updateEnrollment = async (req, res, next) => {
    try {
        const { student, course} = req.body;

        // Check if the student exists
        const Student = await User.findOne({ Id: student, role: 'S' });
        if (!Student) {
            return next(createError(404, "Invalid student code"));
        }

        // Check if the course exists
        const Course = await Course.findOne({ code: course });
        if (!Course) {
            return next(createError(404, "Invalid course code"));
        }
        //find if updated enrollment exists

        // Update the enrollment status
        const updatedEnrollment = await Enrollment.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})

        res.status(200).json(updatedEnrollment);
    } catch (err) {
        next(err);
    }
};

//STUDENT ENROLL TO THE COURSE
export const enrollInCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id

        // Check if the user is already enrolled in the course
        const existingEnrollment = await Enrollment.findOne({ student: userId, course: courseId });
        if (existingEnrollment) {
            return next(createError(400, "You are already enrolled or in pending status for this course."));
        }

        // Create a new enrollment document
        const enrollment = new Enrollment({
            student: userId,
            course: courseId,
            status: "P"
        });

        await enrollment.save();
        res.status(201).json(enrollment);
    } catch (error) {
        next(createError(500, 'Failed to enroll in the course.'));
    }
};

//GET PENDING ENROLLMENT REVIEWS(ADMIN TASK)
export const getPendingEnrollments = async (req, res, next) => {
    try {
        const pendingEnrollments = await Enrollment.find({status: "P"}).populate("student course");
        res.json(pendingEnrollments);
    } catch (error) {
        next(createError(500, "Failed to retrieve pending enrollments."));
    }
};

//RESOLVE ENROLLMENT STATUS(ADMIN TASK) //IF REJECTED AUTOMATICALLY SHOULD BE DELETED
//CREATE A NOTIFICATION AND SEND IT TO ONLY THE STUDENT THAT HE IS ENROLLED IN THIS COURSE(NODEMAILER)
export const resolveEnrollment = async (req, res, next) => {
    try {
        const enrollmentId  = req.params.id;
        const enrollment = await Enrollment.findById(enrollmentId);

        if (!enrollment) {
            return next(createError(404, "Enrollment not found."));
        }

        // Update the status of the enrollment to 'accepted'
        const updatedEnrollment = await Enrollment.findByIdAndUpdate(enrollmentId, {status: req.body.status},{new:true});
        res.status(200).json(updatedEnrollment);
    } catch (error) {
        next(createError(500, "Failed to resolve enrollment."));
    }
};
