import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const BookingSchema = new Schema({
    type: {
        type: String,
        enum: [ "L", "E"]
    },// Lectures, Events
   date: {
        type: Date,
        required: true
   },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: { // New field courseId
        type: Schema.Types.ObjectId,
        ref: 'Course', 
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    resourceIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Resource'
    }], // Array of resource object references
    status: {
        type: String,
        enum: ["P", "A", "R"],
        default: "P"
    }// Pending, Approved, Rejected
}, { timestamps: true });

export default model("Booking", BookingSchema);
