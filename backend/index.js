import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import courseRoute from "./routes/courses.js";
import resourceRoute from "./routes/resources.js";
import enrollmentRoute from "./routes/enrollments.js";
import roomsRoute from "./routes/rooms.js";
import notificationsRoute from "./routes/notifications.js";
import bookingRoute from "./routes/bookings.js";
import dotenv from "dotenv";
import logger from "./utils/logger.js";

const app = express();

 dotenv.config();

app.disable("x-powered-by"); //less hackers know about our stack
const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    }catch(error){
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
})

//middlwares
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/courses", courseRoute);
app.use("/api/resources", resourceRoute);
app.use("/api/enrollments", enrollmentRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/notifications", notificationsRoute);
app.use("/api/bookings", bookingRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!!!"
    // logger.error(err.stack);
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(8880, () => {
    connect();
    console.log("Backend is connected!!!");
}); 