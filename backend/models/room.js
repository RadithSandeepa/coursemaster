import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const RoomSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },// lecture hall, classroom, lab
    capacity: {
        type: String,
        required: true
    },
    }, { timestamps: true } 
);

export default model("Room", RoomSchema);
  