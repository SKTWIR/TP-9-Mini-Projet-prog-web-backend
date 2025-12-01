import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

const users = [
    { username: "admin", password: "$2b$10$StBKWYkG...", role: "admin" }
];

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const exists = users.find(u => u.username === username);
    if (exists) return res.status(400).json({ message: "User exists" });

    const hash = await bcrypt.hash(password, 10);
    users.push({ username, password: hash, role: "user" });

    res.json({ message: "Registered" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Wrong password" });

    req.session.user = { username, role: user.role };
    res.json({ username, role: user.role });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out" });
});

export default router;
