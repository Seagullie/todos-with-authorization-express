import mongoose from "mongoose";
import {
    DATABASE_URL
} from "../Constants/Keys";


export const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log("MongoDB Connected");

        // output the db that we got connected to
        console.log("Connected to the following database:", mongoose.connection.db.databaseName);
    } catch (err) {
        console.log(err);
    }
};


