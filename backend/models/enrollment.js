import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const EnrollmentSchema = new Schema({
    student: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    course: { 
        type: Schema.Types.ObjectId, 
        ref: 'Course', 
        required: true 
    },
    status: { 
        type: String, 
        required: true, 
        enum: ["P", "A", "R"], 
        default: "P" 
    },//PENDING, ACCEPTED, REJECTED
  }, { timestamps: true });

export default model("Enrollment", EnrollmentSchema);