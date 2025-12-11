const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
const app = express();

// Shows HTTP requests in the console
app.use(morgan("dev"));

// parse application/x-www-form-urlencoded
// this will allow us to access data from a POST request
app.use(bodyParser.urlencoded({ extended: false }))

// CORS allows requests from any origin (e.g., from the front-end)
app.use(cors());

app.use(express.static(path.join(__dirname, '../front-end')));

// Called for GET request at http://localhost:8080/
// app.get('/', function (req, res)
// {
//     console.log('GET / called');
//     res.send('<h1>Hello world, the server is running correctly!</h1>');
// })

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end', 'sample.html'));
});


// The routes defined in ./routes/sample.js will be listened by the server
app.use('/', require('./routes/sample'));
// TODO: add new routes here

app.get('/team', function (req, res) {
    const sql = '' +
        'SELECT id, firstName, lastName, teamName' +
        'FROM team' +
        'ORDER BY id';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: 'Database Error'});
        }
    });
});
module.exports = app;
