import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ResourceSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },//projector, computer, lab equipment
    }, { timestamps: true } 
);

export default model("Resource", ResourceSchema);