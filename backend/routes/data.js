import express from "express";
import { loadRosters } from "../services/loadData.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/rosters", async (req, res) => {
    const rosters = await loadRosters();
    res.json(rosters);
});

router.get("/stats", requireAuth, async (req, res) => {
    const rosters = await loadRosters();

    const positions = {};
    const nationalities = {};

    for (const p of rosters) {
        positions[p.Position] = (positions[p.Position] || 0) + 1;
        nationalities[p.Nationality] = (nationalities[p.Nationality] || 0) + 1;
    }

    res.json({
        positions,
        nationalities
    });
});

export default router;
