import Resource from '../models/resource.js';
import Booking from '../models/booking.js';
import Notification from '../models/notification.js';
import { createError } from "../utils/error.js";

// ADD NEW RESOURCE
export const addResource = async (req, res, next) => {
    const existingResource = await Resource.findOne({ code: req.body.code });
    if (existingResource) {
        return next(createError(403, "Resource ID already exists."));
    }
    const newResource = new Resource(req.body)

    try{
        const savedResource = await newResource.save();
        res.status(201).json(savedResource);
    } catch(err) {
        next(err);
    }
}

// GET ALL RESOURCES
export const getAllResources = async (req, res, next) => {
    try{
        const resourceList = await Resource.find();
        res.status(200).json(resourceList);
    } catch(err) {
        next(err);
    }
}

// GET SINGLE RESOURCE
export const getResourceByID = async (req, res, next) => {
    try{
        const resource = await Resource.findById(req.params.id);
        res.status(200).json(resource);
    } catch(err){
        next(err);
    }
}

// DELETE A RESOURCE (BOOKINGS ASSOCIATED TO IT WILL REMOVE BOOKED RESOURCE AND SEND A NOTIIFICATION) /IMPLEMENT DELETE IT FROM COURSE RECORDS
export const deleteResource = async (req, res, next) => {
    try {
        const resourceId = req.params.id;

        const deletedResource = await Resource.findByIdAndDelete(resourceId);

        if (!deletedResource) {
            return res.status(404).json("Resource not found...");
        }

        // Remove the deleted resource ID from all bookings
        await Booking.updateMany({ resourceIds: resourceId }, { $pull: { resourceIds: resourceId } });

        // Send notification about resource deletion
        const notification = new Notification({
            title: `Resource Unavailable: ${deletedResource.code}`,
            description: `The ${deletedResource.type} -  ${deletedResource.code} is no longer available. Please refer to the published notice for updated classroom details and alternative arrangements.`,
        });
        await notification.save();
        res.status(200).json("Resource has been deleted...");
    } catch (err) {
        next(err);
    }
}


// UPDATE RESOURCE DATA
export const updateResourceData = async (req,res,next) => {
    try {
        const updatedResource = await Resource.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updatedResource)
    }
    catch(err){
        next(err);
    }
}


