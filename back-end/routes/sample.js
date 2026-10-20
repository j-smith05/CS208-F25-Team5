let express = require('express');
let router = express.Router();
const db = require("../db");

router.get("/api/jeopardy", async (req, res) => {
    try {
        const rows = await db.getAllJeopardyQuestions();

        // Standardize field names to EXACTLY what frontend expects
        const formatted = rows.map(r => ({
            category: r.category,     // Disney, Literature, etc.
            question: r.question,
            answer: r.answer,
            points: r.points
        }));

        res.json(formatted);
    }
    catch (err) {
        console.error("Failed to load jeopardy questions:", err);
        res.status(500).json({ error: "Failed to load jeopardy questions" });
    }
});

router.get("/api/jeopardy_2", async (req, res) => {
    try {
        const rows = await db.getAllJeopardy2Questions();

        // Standardize field names to EXACTLY what frontend expects
        const formatted = rows.map(r => ({
            category: r.category,     // Disney, Literature, etc.
            question: r.question,
            answer: r.answer,
            points: r.points
        }));

        res.json(formatted);
    }
    catch (err) {
        console.error("Failed to load jeopardy questions:", err);
        res.status(500).json({ error: "Failed to load jeopardy questions" });
    }
});

router.get("/api/jeopardy_3", async (req, res) => {
    try {
        const rows = await db.getAllJeopardy3Questions();

        // Standardize field names to EXACTLY what frontend expects
        const formatted = rows.map(r => ({
            category: r.category,     // Movies & TV, History, etc.
            question: r.question,
            answer: r.answer,
            points: r.points
        }));

        res.json(formatted);
    }
    catch (err) {
        console.error("Failed to load jeopardy questions:", err);
        res.status(500).json({ error: "Failed to load jeopardy questions" });
    }
});


module.exports = router;
