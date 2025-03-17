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


// const UserSchema = new mongoose.Schema({
//     name: String,
//     email: {
//         type: String,
//         unique: true
//     },
//     password: String,
//     role: {
//         type: String,
//         enum: ["admin", "viewer"],
//         default: "viewer"
//     }
// });
// const User = mongoose.model("User", UserSchema);