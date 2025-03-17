import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,

    completed: {
        type: Boolean,
        default: false
    },
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TodoList"
    }
}, {
    collection: "todos"
});
const Task = mongoose.model("Task", TaskSchema);

export default Task;