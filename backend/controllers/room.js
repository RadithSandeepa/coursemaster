import Room from '../models/room.js';
import Notification from '../models/notification.js';
import Booking from '../models/booking.js';
import { createError } from "../utils/error.js";

// ADD NEW ROOM
export const addRoom = async (req, res, next) => {
    
    const existingRoom = await Room.findOne({ code: req.body.code });
    if (existingRoom) {
        return next(createError(403, "Room ID already exists."));
    }
    const newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch(err) {
        next(err);
    }
}

// GET ALL ROOMS
export const getAllRooms = async (req, res, next) => {
    try{
        const roomList = await Room.find();
        res.status(200).json(roomList);
    } catch(err) {
        next(err);
    }
}

// GET SINGLE ROOM
export const getRoomByID = async (req, res, next) => {
    try{
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch(err){
        next(err);
    }
}

// DELETE A ROOM SEND NOTIFICATION TO USER AND DELETE IT FROM BOOKING RECORDS  //IMPLEMNT DELETING IT IN COURSE RECORDS
export const deleteRoom = async (req, res, next) => {
    try {
        const roomId = req.params.id;

        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json("Room not found");
        }

        const notification = new Notification({
            title: `Room Unavailable: ${room.code}`,
            description: `This room is no longer available. Please refer to the published notice for updated classroom details and alternative arrangements.`
        });
        await notification.save();

        await Booking.updateMany({ roomId }, { $pull: { roomId: roomId } });

        await Room.findByIdAndDelete(roomId);
        res.status(200).json("Room has been deleted...");
    } catch (err) {
        next(err);
    }
}


// UPDATE ROOM DATA
export const updateRoomData = async (req,res,next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updatedRoom)
    }
    catch(err){
        next(err);
    }
}
