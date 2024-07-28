import Booking from '../models/booking.js';
import Resource from '../models/resource.js';
import Room from '../models/room.js';
import Course from '../models/course.js';
import { createError } from "../utils/error.js";

// ADD NEW BOOKING(EVENT BOOKING FOR STUDENYS IMPLEMENT THIS ON FRONTEND)
export const addBooking = async (req, res, next) => {
    const { type, date, startTime, endTime, roomCode, resourceCodes, courseCode } = req.body;
    const userId = req.user.id;

    const room = await Room.findOne({ code: roomCode });
    if (!room) {
        return next(createError(404, 'Room not found.'));
    }

    const resources = await Resource.find({ code: { $in: resourceCodes } });
    if (!resources || resources.length !== resourceCodes.length) {
         return next(createError(404, 'One or more resources not found.'));
    }
    const resourceIds = resources.map(resource => resource._id);

    const course = await Course.findOne({ code: courseCode });
        if (!course) {
            return next(createError(404, 'Course not found.'));
        }

    try{
        const booking = new Booking({
            type,
            date,
            startTime,
            endTime,
            roomId: room._id,
            userId,
            resourceIds,
            courseId: course._id,
            status: 'P' // Pending status
        });
        await booking.save();
        res.status(201).json(booking);
    } catch(err) {
        next(err);
    }
}

// GET ALL BOOKINGS
export const getAllBookings = async (req, res, next) => {
    try{
        const bookingList = await Booking.find();
        res.status(200).json(bookingList);
    } catch(err) {
        next(err);
    }
}

// GET SINGLE BOOKING
export const getBookingByID = async (req, res, next) => {
    try{
        const booking = await Booking.findById(req.params.id);
        res.status(200).json(booking);
    } catch(err){
        next(err);
    }
}

// DELETE A BOOKING(BOOKING ID WILL BE DELETED FROM ROOM AND RESOURCES RECORDINGS)
export const deleteBooking = async (req, res, next) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

        if (deletedBooking.status === 'A') {

            if(deletedBooking.type === 'L'){
                await Course.updateOne(
                    { bookings: deletedBooking._id },
                    { $pull: { bookings: deletedBooking._id } }
                );
            }
        }
        res.status(200).json("Booking has been deleted...");
    } catch (err) {
        next(err);
    }
}


// UPDATE BOOKING DATA (RESTRICT FIELDS FROM FRONTEND)  (I THINK WE DONT NEED THIS AT ALL CHECK LATER)
export const updateBookingData = async (req,res,next) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updatedBooking)
    }
    catch(err){
        next(err);
    }
}

//GET ALL PENDING BOOKINGS FOR APPROVE(ADMIN TASK)
export const getPendingBookings = async (req, res, next) => {
    try {
        const pendingBookings = await Booking.find({ status: 'P' }).populate('roomId resourceIds');
        res.status(200).json(pendingBookings);
    } catch (error) {
        next(err);
    }
};

//ONLY ONE FACULTY MEMBER CAN HAVE FOR ONE COURSE AT A TIME --NO ADD COURSE FIELD TO BOOKING
//APPROVE OR REJECT PENDING BOOKINGS(ADMIN TASK) 
export const approveBooking = async (req, res, next) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findById(req.params.id);
        const { status } = req.body;
       
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (status === 'A' && booking.type === 'L') {
            const { courseId } = booking;

            if (!courseId) {
                return next(createError(404, 'Course ID not found in the booking.'));
            }

            const course = await Course.findById(courseId);

            if (!course) {
                return next(createError(404, 'Course not found for the associated course ID.'));
            }

            // Push the booking ID to the associated course's bookings array
            const updatedCourse = await Course.findByIdAndUpdate(course._id, { $addToSet: { bookings: bookingId } });

            if (!updatedCourse) {
                return next(createError(404, 'Failed to update course with booking ID.'));
            }
            
        }
        res.status(200).json(updatedBooking);
    } catch (err) {
        next(err);
    }
};

//GET ONE USERS BOOKINGS(USER TASK)
export const getUserBookings = async (req, res, next) => {
    try {
        const userId = req.params.id; // Assuming user ID is stored in req.user

        // Find bookings for the user
        const bookings = await Booking.find({ userId });

        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
};

//UPDATE ONE USERS BOOKINGS(USER TASK) IF UPDATED STATUS BECOMES PENDING AGAIN (IF STATUS WAS  A IT NEEDS TO BE REMOVED FROM ROOM AND RESOURCES BOOKED FIELDS && IF TYPE WAS A LECTURE IT NEEDS TO BE REMOVED FROM COURSES BOOKINGS FIELD)
export const updateUserBooking = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const bookingId = req.params.BookingId; 
        const updateFields = req.body; 

        let booking = await Booking.findOne({ _id: bookingId, userId: userId });

        if (!booking) {
            return next(createError(404, 'Booking not found for the user.'));
        }

        // Check if the booking status was "A" before updating
        const wasApproved = booking.status === 'A';
        const isTypeLecture = booking.type === 'L';
        
        let updatedBooking = await Booking.findOneAndUpdate({ _id: bookingId, userId: userId }, updateFields, { new: true });

        if (!updatedBooking) {
            return next(createError(404, 'Booking not found for the user.'));
        }

        // Automatically set status to "Pending" after update
        updatedBooking.status = 'P';
        updatedBooking = await updatedBooking.save();

        if (isTypeLecture && wasApproved) {
            await Course.updateOne(
                { bookings: bookingId },
                { $pull: { bookings: bookingId } }
            );
        }

        res.status(200).json(updatedBooking);
    } catch (err) {
        next(err);
    }
};

//DELERE ONE USERS BOOKINGS(USER TASK) (IF YOU DELETE AN APPROVED BOOKING ROOM AND RESOURCES THAT HOLDS THAT BOOKING ID SHOULD BE DELETED AND COURSES THAT HOLDS THE BOOKIG ID SHOULD BE DELETED) //DONE
export const deleteUserBooking = async (req, res, next) => {
    try {
        const userId = req.params.id; 
        const bookingId = req.params.BookingId; 

        const booking = await Booking.findOne({ _id: bookingId, userId: userId });

        if (!booking) {
            return next(createError(404, 'Booking not found for the user.'));
        }

        await Booking.findByIdAndDelete(bookingId);

        if (booking.status === 'A') {
        
            if(booking.type === 'L'){
                await Course.updateOne(
                    { bookings: bookingId },
                    { $pull: { bookings: bookingId } }
                );
            }
        }
        res.status(200).json("Booking has been deleted...");
    } catch (err) {
        next(err);
    }
};



