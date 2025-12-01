import express from "express";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";
import adminRoutes from "./routes/admin.js";

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

app.listen(3000, () => {
    console.log("🔥 Server running on port 3000");
});
