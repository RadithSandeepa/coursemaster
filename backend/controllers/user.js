import Enrollment from '../models/enrollment.js';
import User from '../models/user.js';
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";

// GET ALL USERS
export const getAllUsers = async (req, res, next) => {
    try{
        const userList = await User.find();
        res.status(200).json(userList);
    } catch(err) {
        next(err);
    }
}


// GET SINGLE USER
export const getUserByID = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(err){
        next(err);
    }
}


// DELETE A USER(WHEN DELETING IMPLEMENT HOW OTHERS INTERACT WITH THS USER) DONE//
export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (user.role === 'A' || user.role === 'F') {
            return res.status(403).json("You can't delete Admin or Faculty accounts without consulting your organization");
        }

        const userEnrollments = await Enrollment.find({ student: userId });

        if (userEnrollments.length === 0) {
            await User.findByIdAndDelete(userId);
            return res.status(200).json("User has been deleted");
        }

        await Enrollment.deleteMany({ student: userId });
        await User.findByIdAndDelete(userId);
        res.status(200).json("User and associated enrollments have been deleted");
    } catch (err) {
        next(err);
    }
}


// UPDATE USER DATA
export const updateUserData = async(req,res,next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updatedUser)
    }
    catch(err){
        next(err);
    }
}

//GET FACULTY MEMBER IDS
export const getFacultyMemberIds = async(req, res, next) => {
    try {
        const instructors = await User.find({ role: 'F' }, 'Id'); 
        const instructorIds = instructors.map(instructor => instructor.Id);
        res.status(200).json(instructorIds);
      } catch (err) {
            next(err);
      }
}

//GET STUDENT IDS
export const getStudentIds = async (req, res, next) => {
    try {
      const students = await User.find({ role: 'S' }, 'Id');
      const studentIds = students.map(student => student.Id);
      res.status(200).json(studentIds);
    } catch (err) {
      next(err);
    }
}

//UPDATE PASSWORD
export const updatePassword = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const existingUser = await User.findById(userId);
        
        if (!existingUser) {
            return next(createError(404, "User not found."));
        }

        const newPassword = req.body.password;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        existingUser.password = hash;
        await existingUser.save();

        res.status(200).send("Password has been updated.");
    } catch (err) {
        next(err);
    }
}
  