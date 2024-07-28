import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import Course from '../models/course.js';
import Enrollment from '../models/enrollment.js';
import Resource from '../models/resource.js';
import Room from '../models/room.js';

//CREATE TWO FUNCTIONS FOR STUDENT AND ADMIN
export const register = async (req, res, next) => {
    try{
        const existingUser = await User.findOne({ Id: req.body.Id });
        if (existingUser) {
            return next(createError(403, "User ID already exists."));
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            Id: req.body.Id,
            email: req.body.email,
            password: hash,
            role: req.body.role,
            mobile: req.body.mobile
        })

        await newUser.save()
        res.status(200).send("User has been created.")
    }catch(err){
        next(err);
    }
}


export const login = async (req, res, next) => {
    try{

        const user = await User.findOne({email: req.body.email});

        if(!user) 
            return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password, 
            user.password
        );

        if(!isPasswordCorrect) 
            return next(createError(404, "Invalid Email or Password!"));

        const token = jwt.sign({id:user._id, role: user.role }, process.env.JWT, { expiresIn: "300m"});

        const now = new Date();
        const expirationTime = new Date(now.getTime() + 300 * 60 * 1000);

        const {password, role, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({details:{...otherDetails} , role, token, expirationTime});
    }catch(err){
        next(err);
    }
}

export const logout = async (req, res, next) => {
    try {
      // Clear the access_token cookie
      await res.clearCookie("access_token", { httpOnly: true });
      res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        next(err);
    }
}

export const count = async (req, res, next) => {
    try {
        const roomCount = await Room.countDocuments();
        const resourceCount = await Resource.countDocuments();
        const enrollmentCount = await Enrollment.countDocuments();
        const courseCount = await Course.countDocuments();
        const studentCount = await User.countDocuments({ role: 'S' });
        const facultyCount = await User.countDocuments({ role: 'F' });

        res.json({
          roomCount,
          resourceCount,
          enrollmentCount,
          courseCount,
          studentCount,
          facultyCount,
        });
      } catch (err) {
        next(err);
      }
}







