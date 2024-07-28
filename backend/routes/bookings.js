import express from "express";
import { addBooking, approveBooking, deleteBooking, deleteUserBooking, getAllBookings, getBookingByID, getPendingBookings, getUserBookings, updateBookingData, updateUserBooking } from "../controllers/booking.js";
import { verifyAdmin, verifyNotAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/",verifyNotAdmin, addBooking);

//UPDATE--
router.put("/:id",verifyAdmin, updateBookingData);

//DELETE--
router.delete("/:id",verifyAdmin, deleteBooking);

//GET --
router.get("/:id", verifyAdmin, getBookingByID);

//GET ALL--
router.get("/", verifyAdmin, getAllBookings);

//GET PENDING BOOKINGS(ADMIN TASK)--
router.get('/check/pending', verifyAdmin, getPendingBookings);

//CHANGE PENDING BOOKING STATUS(ADMIN TASK)--
router.put('/pending/:id/resolve', verifyAdmin, approveBooking);

//GET USERS BOOKINGS--
router.get('/:id/assigned', verifyUser, getUserBookings);

//DELETE USER BOOKINGS
router.delete('/:id/myBookings/:BookingId', verifyUser, deleteUserBooking)

//UPDATE USER BOOKINGS
router.put('/:id/myBookings/:BookingId', verifyUser, updateUserBooking);

export default router;