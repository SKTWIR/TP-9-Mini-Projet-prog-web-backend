import express from "express";
import { requireAdmin } from "../middleware/authMiddleware.js";
import { loadRosters } from "../services/loadData.js";

const router = express.Router();

router.get("/complex-stats", requireAdmin, async (req, res) => {
    const rosters = await loadRosters();

    const complex = rosters.map(p => ({
        Player: p["Player Name"],
        Attack: Number(p["Attack Points"]),
        Block: Number(p["Block Points"]),
        Serve: Number(p["Serve Points"])
    }));

    res.json(complex);
});

export default router;
