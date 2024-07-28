import Course from '../models/course.js';
import Enrollment from '../models/enrollment.js';
import Notification from '../models/notification.js';
import User from '../models/user.js';
import { createError } from '../utils/error.js';

//FACVULTY SHOULD BE ABLE TO C&R&D WEEKLY CONTENT

// ADD NEW COURSE
export const addCourse = async (req, res, next) => {
    const newCourse = new Course(req.body)

    try{
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch(err) {
        next(err);
    }
}


// GET ALL COURSES
export const getAllCourses = async (req, res, next) => {
    try{
        const courseList = await Course.find();
        res.status(200).json(courseList);
    } catch(err) {
        next(err);
    }
}


// GET SINGLE COURSE
export const getCourseByID = async (req, res, next) => {
    try{
        const course = await Course.findById(req.params.id);
        res.status(200).json(course);
    } catch(err){
        next(err);
    }
}


// DELETE A COURSE(IF THERE ARE ENROLLMENTS TO A COURSE IT CANT BE DELETED. IF NOT IT WILL BE DELETED AND A NOTIFICATION WILL BE PUBLISHED)  //IMPLEMENT DELETING BOOKING RECPRDS ROOM RECORDS AND RESOURCE RECORDS OF BOOKING IDS
export const deleteCourse = async (req, res, next) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json("Course not found");
        }

        const courseEnrollments = await Enrollment.find({ course: courseId });

        if (courseEnrollments.length > 0) {
            return res.status(403).json("Cannot delete course. There are enrollments associated with it.");
        }

        await Course.findByIdAndDelete(req.params.id);

        const notificationTitle = `${course.code} course is no longer available`;
        const notificationDescription = `Due to organizational reasons, we no longer offer ${course.name} - (${course.code}). please contact our support hotline at xxxxxxxxxx for more information.`;

        const notification = new Notification({
            title: notificationTitle,
            description: notificationDescription
        });
        await notification.save();

        res.status(200).json("Course has been deleted...");
    } catch (err) {
        next(err);
    }
}


// UPDATE COURSE DATA
export const updateCourseData = async (req,res,next) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updatedCourse)
    }
    catch(err){
        next(err);
    }
}

//ASSIGN FACULTY TO COURSE(ADMIN TASK)
export const assignFacultyToCourse = async (req, res, next) => {
    try {
       
        const { facultyId } = req.body;
    
        const course = await Course.findById(req.params.id);
    
        if (!course) {
            return next(createError(404, "Course not found!"));
        }

        const facultyMember = await User.findOne({ Id: facultyId, role: "F" });
        if (!facultyMember) {
            return next(createError(404, "Faculty member not found!"));
        }
    
        course.faculty = [facultyMember._id];
        await course.save();
    
        res.status(200).json({message:"Faculty assigned to course successfully", course});
    } catch (err) {
        next(err);
    } 
}

// GET ASSIGNED COURSES FOR FACULTY MEMBER
export const getAssignedCourses = async (req, res, next) => {
    try {
        const facultyId = req.user.id;
      

        // Find courses where the faculty member's ID is in the faculty array
        const assignedCourses = await Course.find({ faculty: facultyId });

        res.status(200).json(assignedCourses);
    } catch (error) {
        next(createError(500, "Failed to retrieve assigned courses."));
    }
};

//GET ENROLLED COURSES(FOR STUDENTS)
export const getApprovedCourses = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const approvedEnrollments = await Enrollment.find({ student: userId, status: "A" });

        const courseIds = approvedEnrollments.map(enrollment => enrollment.course);

        if (courseIds.length === 0) {
            return res.status(200).json("No approved courses found for this student.");
        }

        const approvedCourses = await Course.find({ _id: { $in: courseIds } });
        res.status(200).json(approvedCourses);
    } catch (error) {
        next(createError(500, "Failed to retrieve approved courses."));
    }
};

//GET COURSE IDS 
export const getCourseIds = async (req,res,next) => {
    try {
        const existingCodes = await Course.find().distinct("code");
        res.status(200).json(existingCodes);
    }
    catch(err){
        next(err);
    }
}

export const addWeeklyContent = async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const { userId } = req.params;
      const { weekNumber, content } = req.body;
  
      const course = await Course.findById(courseId);

      if (!course.faculty.includes(userId)) {
        next(createError(403, "You are not authorized to perform this action"));
      }
  
      course.weeks.push({ weekNumber, content });
      await course.save();
  
      res.status(200).json(course);
    } catch (err) {
      next(err);
    }
  };

export const getAllWeeklyContent = async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const course = await Course.findById(courseId);
      if (!course) {
        return next(createError(404, 'Course not found'));
      }
      res.status(200).json(course.weeks);
    } catch (err) {
      next(err);
    }
  };