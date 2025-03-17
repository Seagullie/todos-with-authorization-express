import bcrypt from "bcryptjs";

interface LoginRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}


const generateToken = (user) => jwt.sign({
    id: user._id,
    role: user.role
}, process.env.JWT_SECRET, {
    expiresIn: "1d"
});

// Register
app.post("/api/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            ...req.body,
            password: hashedPassword
        });
        await user.save();
        res.json({
            token: generateToken(user)
        });
    } catch (err) {
        res.status(400).json({
            error: "User already exists"
        });
    }
});

// Login
app.post("/api/login", async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({
            error: "Invalid credentials"
        });
    }
    res.json({
        token: generateToken(user)
    });
});