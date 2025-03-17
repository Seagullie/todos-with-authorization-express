import mongoose from "mongoose";

const TodoListSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
  },
  {
    // TODO: Unhardcode
    collection: "todo_lists",
  }
);
const TodoList = mongoose.model("TodoList", TodoListSchema);

export default TodoList;
