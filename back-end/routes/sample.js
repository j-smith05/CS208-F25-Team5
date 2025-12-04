let express = require('express');
let router = express.Router();
const db = require("../db");

/**
 * http://localhost:8080/samples
 * GET /samples
 *
 * @return a list of samples (extracted from the samples table in the database) as JSON
 */
router.get("/samples", async function (req, res)
{
    try
    {
        const listOfSamples = await db.getAllSamples();
        console.log("listOfSamples:", listOfSamples);

        // this automatically converts the array of samples to JSON and returns it to the client
        res.send(listOfSamples);
    }
    catch (err)
    {
        console.error("Error:", err.message);
        res.status(500).json({ "error": "Internal Server Error" });
    }
});

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


module.exports = router;
