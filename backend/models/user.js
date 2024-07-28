import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    Id:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["A", "F", "S"], // Restrict values to "A", "F", "S"
        default: "S", 
    },
    }, 
    {timestamps: true}
);

export default model("User", UserSchema);

