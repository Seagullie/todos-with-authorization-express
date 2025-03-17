interface TodoListRequest extends Request {
    body: {
        name: string;
    };
    user: {
        id: string;
    };
}

// CRUD for Tasks
app.post("/api/tasks", authMiddleware, async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

app.get("/api/tasks/:listId", authMiddleware, async (req, res) => {
    const tasks = await Task.find({
        listId: req.params.listId
    });
    res.json(tasks);
});

app.put("/api/tasks/:id", authMiddleware, async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({
        error: "Task not found"
    });
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
});

app.delete("/api/tasks/:id", authMiddleware, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({
        message: "Task deleted"
    });
});