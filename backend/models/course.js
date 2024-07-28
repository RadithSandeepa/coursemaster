import mongoose from 'mongoose';
const { Schema, model } = mongoose;
//add course duration

const CourseSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    code: { 
      type: String, 
      required: true ,
      unique: true
    },
    header: { 
      type: String 
    },
    description: { 
        type: String 
    },
    credits: { 
      type: Number, 
      required: true,
      min: 1,
      max: 5
    },
    faculty: [
        { type: Schema.Types.ObjectId, 
          ref: 'User' 
        }
    ], 
    weeks: [{
      weekNumber: { type: Number, required: true, unique: true },
      content: { type: String, required: true }
    }],
    bookings: [
      { 
        type: Schema.Types.ObjectId, 
        ref: 'Booking' 
      }
    ]},{ timestamps: true }
  );

export default model("Course", CourseSchema);
