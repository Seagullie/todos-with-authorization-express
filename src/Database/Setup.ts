import mongoose from "mongoose";


mongoose.connect(DATABASE_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ["admin", "viewer"],
        default: "viewer"
    }
});
const User = mongoose.model("User", UserSchema);

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
});
const Task = mongoose.model("Task", TaskSchema);

const TodoListSchema = new mongoose.Schema({
    name: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});
const TodoList = mongoose.model("TodoList", TodoListSchema);