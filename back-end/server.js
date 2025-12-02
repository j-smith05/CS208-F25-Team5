const app = require('./app');
const { Server } = require("socket.io");

const PORT = 8080;

// Start the web httpServer
const httpServer = app.listen(PORT, function ()
{
    console.log("Starting the TBDSampleApplication: Node API Server...");
    console.log(`The server will listen on port ${PORT}...`);
    console.log("In a browser, open the URL:");
    console.log("    http://localhost:8080/sample");
    console.log("to see a list of samples in JSON format.");
});

// create the "socket" which is a bidirectional, real-time communication channel between the client and server
const io = new Server(httpServer, {
    cors: {
        origin: "*" // allow connections from everywhere
    }
});

// buzzer state
let buzzOpen = false;
let firstBuzz = null;

// track connected players
let players = {};

io.on("connection", (socket) =>
{
    console.log("Client connected:", socket.id);

    // Player registers their display name
    socket.on("registerPlayer", (playerName) => {
        players[socket.id] = playerName;
        console.log(`Player joined: ${playerName}`);
        io.emit("playerList", Object.values(players));
    });

    // Host opens the buzzers
    socket.on("openBuzzers", () => {
        buzzOpen = true;
        firstBuzz = null;
        io.emit("buzzersOpen");
        console.log("Buzzers OPENED");
    });

    // Player attempts to buzz
    socket.on("buzz", () => {
        if (!buzzOpen) return;

        if (firstBuzz === null) {
            firstBuzz = players[socket.id];
            buzzOpen = false;

            console.log(`BUZZ WINNER: ${firstBuzz}`);
            io.emit("buzzWinner", firstBuzz);
        }
    });

    // Host resets buzzer system
    socket.on("resetBuzzers", () => {
        buzzOpen = false;
        firstBuzz = null;
        io.emit("buzzersReset");
        console.log("Buzzers RESET");
    });

    // Cleanup on disconnect
    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
        delete players[socket.id];
        io.emit("playerList", Object.values(players));
    });
});
