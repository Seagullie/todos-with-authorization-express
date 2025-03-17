// CRUD for Todo Lists
app.post("/api/todolists", authMiddleware, async (req: Request, res: Response) => {
    const user = req.user
    const userId = user.id;
    const list = new TodoList({
        name: req.body.name,
        owner: req.user.id
    });
    await list.save();
    res.json(list);
});

app.get("/api/todolists", authMiddleware, async (req, res) => {
    const lists = await TodoList.find({
        $or: [{
            owner: req.user.id
        }, {
            collaborators: req.user.id
        }]
    });
    res.json(lists);
});

app.put("/api/todolists/:id", authMiddleware, async (req, res) => {
    const list = await TodoList.findById(req.params.id);
    if (!list || list.owner.toString() !== req.user.id) return res.status(403).json({
        error: "Unauthorized"
    });
    list.name = req.body.name;
    await list.save();
    res.json(list);
});

app.delete("/api/todolists/:id", authMiddleware, async (req, res) => {
    const list = await TodoList.findById(req.params.id);
    if (!list || list.owner.toString() !== req.user.id) return res.status(403).json({
        error: "Unauthorized"
    });
    await list.deleteOne();
    res.json({
        message: "List deleted"
    });
});