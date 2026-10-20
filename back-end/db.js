const fs = require("fs");
const sqlite3 = require('sqlite3').verbose();

// TODO: create a SQLite data source in IntelliJ with the name: "./back-end/cs208_project.sqlite"


// Do not change this name. The 'cs208_project.sqlite' will be created in the same folder as db.js
const SQLITE_FILE_NAME = "cs208_project.sqlite";


let db;

// If the run environment is 'test', we create an ephemeral (in memory) SQLite database that will
//   - create tables using the structure defined in the schema file: './resources/sql/schema.sql'
//   - populate the tables with data from the seeds file: './resources/sql/seeds.sql'
// Once the tests complete (i.e., finish running), this in memory SQLite database will be deleted automatically
//
// However, if the environment is not 'test' (e.g., the environment is 'development') then the application will use
// the SQLite database specified in the SQLITE_FILE_NAME
if (process.env.NODE_ENV === "test")
{
    console.log("Creating an in memory SQLite database for running the test suite...");

    const contentOfSchemaSQLFile = fs.readFileSync("./resources/sql/schema.sql", "utf8");
    const contentOfSeedsSQLFile = fs.readFileSync("./resources/sql/seeds.sql", "utf8");

    // Creates a connection to an in-memory SQLite database
    db = new sqlite3.Database(":memory:", function(err)
    {
        if (err)
        {
            return console.error(err.message);
        }

        // Enable enforcement of foreign keys constraints in the SQLite database every time we run the tests
        db.get("PRAGMA foreign_keys = ON;");

        console.log(`Connected to the ':memory:' SQLite database.`);
        console.log("Creating the tables from the 'schema.sql' file...");
        console.log("Populating them with data from the 'seeds.sql' file...");
        db.serialize(function()
        {
            // the serialize method ensures that the SQL queries from the exec calls are executed sequentially
            // (i.e., one after the other instead of being executed in parallel)
            db.exec(contentOfSchemaSQLFile);
            db.exec(contentOfSeedsSQLFile);
        });
    });
}
else
{
    // This is the default environment (e.g., 'development')

    // Create a connection to the SQLite database file specified in SQLITE_FILE_NAME
    db = new sqlite3.Database("./" + SQLITE_FILE_NAME, function(err)
    {
        if (err)
        {
            return console.error(err.message);
        }

        // Enable enforcement of foreign keys constraints in the SQLite database every time we start the application
        db.get("PRAGMA foreign_keys = ON;");

        console.log(`Connected to the '${SQLITE_FILE_NAME}' SQLite database for development.`);
    });
}


//I added getPoints, getQuestions, getAnswers and getCategories but my original commit didn't get that so I'm commiting here
function getQuestionData(questionID, fieldName)
{
    return new Promise(function (resolve, reject) {
        const allowedFields = ['points', 'questions', 'answers', 'categories'];
        if (!allowedFields.includes(fieldName)) {
            return Promise.reject(new Error(`Invalid field name requested: ${fieldName}`));
        }

        if (typeof questionID !== 'number' || isNaN(questionID)){
            return reject(new Error("Invalid question number provided"))
        }
        db.serialize(function() {
            const sql =
                `select ${fieldName}
                from jeopardy
                where id = ?`;

            db.get(sql, [questionID], function (err, row) {
                if (err) {
                    return reject(err);
                }

                if (!row) {
                    return resolve(null);
                }

                resolve(row[fieldName]);
            });
        });
    });
}

function getQuestionData2(questionID, fieldName)
{
    return new Promise(function (resolve, reject) {
        const allowedFields = ['points', 'questions', 'answers', 'categories'];
        if (!allowedFields.includes(fieldName)) {
            return Promise.reject(new Error(`Invalid field name requested: ${fieldName}`));
        }

        if (typeof questionID !== 'number' || isNaN(questionID)){
            return reject(new Error("Invalid question number provided"))
        }
        db.serialize(function() {
            const sql =
                `select ${fieldName}
                from jeopardy_2
                where id = ?`;

            db.get(sql, [questionID], function (err, row) {
                if (err) {
                    return reject(err);
                }

                if (!row) {
                    return resolve(null);
                }

                resolve(row[fieldName]);
            });
        });
    });
}
function getAllJeopardyQuestions() {
    return new Promise(function(resolve, reject) {
        db.serialize(function() {

            const sql = `
                SELECT id, categories, questions, answers, points
                FROM jeopardy
                ORDER BY categories, points;
            `;

            const list = [];

            db.each(
                sql,
                function(err, row) {
                    if (err) return reject(err);

                    list.push({
                        id: row.id,
                        category: row.categories,
                        question: row.questions,
                        answer: row.answers,
                        points: row.points
                    });
                },
                function() {
                    resolve(list);
                }
            );
        });
    });
}

function getAllJeopardy2Questions() {
    return new Promise(function(resolve, reject) {
        db.serialize(function() {

            const sql = `
                SELECT id, categories, questions, answers, points
                FROM jeopardy_2
                ORDER BY categories, points;
            `;

            const list = [];

            db.each(
                sql,
                function(err, row) {
                    if (err) return reject(err);

                    list.push({
                        id: row.id,
                        category: row.categories,
                        question: row.questions,
                        answer: row.answers,
                        points: row.points
                    });
                },
                function() {
                    resolve(list);
                }
            );
        });
    });
}

function getAllJeopardy3Questions() {
    return new Promise(function(resolve, reject) {
        db.serialize(function() {

            const sql = `
                SELECT id, categories, questions, answers, points
                FROM jeopardy_3
                ORDER BY categories, points;
            `;

            const list = [];

            db.each(
                sql,
                function(err, row) {
                    if (err) return reject(err);

                    list.push({
                        id: row.id,
                        category: row.categories,
                        question: row.questions,
                        answer: row.answers,
                        points: row.points
                    });
                },
                function() {
                    resolve(list);
                }
            );
        });
    });
}


// TODO: export the functions that will be used in other files
// these functions will be available from other files that import this module
module.exports = {
    connection: db,
    getQuestionData,
    getAllJeopardyQuestions,
    getQuestionData2,
    getAllJeopardy2Questions,
    getAllJeopardy3Questions
};
