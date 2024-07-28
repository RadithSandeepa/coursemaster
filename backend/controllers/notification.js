import Notification from '../models/notification.js';
import { createError } from '../utils/error.js';

// ADD NEW NOTIFICATION
export const addNotification = async (req, res, next) => {
    const newNotification = new Notification(req.body)

    try{
        const savedNotification = await newNotification.save();
        res.status(201).json(savedNotification);
    } catch(err) {
        next(err);
    }
}


// GET ALL NOTIFICATIONS
export const getAllNotifications = async (req, res, next) => {
    try{
        const notificationList = await Notification.find();
        res.status(200).json(notificationList);
    } catch(err) {
        next(err);
    }
}


// GET SINGLE NOTIFICATION
export const getNotificationByID = async (req, res, next) => {
    try{
        const notification = await Notification.findById(req.params.id);
        res.status(200).json(notification);
    } catch(err){
        next(err);
    }
}


// DELETE A NOTIFICATION
export const deleteNotification = async (req, res, next) => {
    try {
        const notification = await Notification.findById(req.params.id);
        
       
        await Notification.findByIdAndDelete(req.params.id);
        res.status(200).json("Notification has been deleted...");
    } catch (err) {
        next(err);
    }
}


// UPDATE NOTIFICATION DATA
export const updateNotificationData = async (req,res,next) => {
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updatedNotification)
    }
    catch(err){
        next(err);
    }
}