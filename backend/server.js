import express from "express";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";
import adminRoutes from "./routes/admin.js";
import path from "path";
import { fileURLToPath } from "url";


const app = express();
app.use(express.json());
app.use(cors());
app.use(
    session({
        secret: "supersecret",
        saveUninitialized: false,
        resave: false
    })
);

app.use("/auth", authRoutes);
app.use("/data", dataRoutes);
app.use("/admin", adminRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir le dossier frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(3000, () => {
    console.log("🔥 Server running on port 3000");
});
