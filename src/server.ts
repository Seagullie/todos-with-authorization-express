import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import tasksRouter from "./Router/TasksRouter";
import taskListsRouter from "./Router/TasksListsRouter";
import {
    connectDB
} from "./Database/Setup";

connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

// assign routes
app.use(tasksRouter)
app.use(taskListsRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));