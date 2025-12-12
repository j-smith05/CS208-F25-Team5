
console.log('sample.js is executing...');

let team1Score = 0;
let team2Score = 0;
let scoreHistory = [];

let team1Name = "Player 1";
let team2Name = "Player 2";

let currentAudio = null;
let isLooping = false;

let jeopardy = "./sounds/Jeopardy-theme-song.mp3"
let correctSound = "./sounds/rightanswer.mp3"
let incorrectSoundOne = "./sounds/family-fortunes-wrong-buzzer.mp3"
let incorrectSoundTwo = "./sounds/wrong-lie-incorrect-buzzer.mp3"

let timerInterval = null;
let timeLeft = 10;

function loopHandler() {
    if (isLooping && currentAudio) {
        currentAudio.currentTime = 0;
        currentAudio.play();
    }
}

function startLoop(fileToPlay) {
    if (currentAudio) {
        stopLoop();
    }

    currentAudio = new Audio(fileToPlay)

    currentAudio.addEventListener('ended', loopHandler);

    isLooping = true;

    currentAudio.play();
}

function stopLoop() {
    isLooping = false;

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio.removeEventListener('ended', loopHandler);
        currentAudio = null;
    }
}

function startTimer(onExpire) {
    const timerDisplay = document.getElementById("timer-display");

    // Reset timer state
    timeLeft = 10;
    timerDisplay.textContent = timeLeft;
    timerDisplay.style.display = "block";

    // Clear any lingering timers
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.style.display = "none";
            onExpire();  // Auto-answer reveal
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    document.getElementById("timer-display").style.display = "none";
}

function updateScores() {
    document.getElementById('team1-score').textContent = team1Score;
    document.getElementById('team2-score').textContent = team2Score;
}

function undoLastScore() {
    if (scoreHistory.length === 0) {
        alert("⚠️ No scores to undo.");
        return;
    }

    const lastAction = scoreHistory.pop();

    if (lastAction.team === 1) {
        team1Score -= lastAction.points;
        alert(`↩️ Undid ${lastAction.points} points from ${team1Name}`);
    }
    else if (lastAction.team === 2) {
        team2Score -= lastAction.points;
        alert(`↩️ Undid ${lastAction.points} points from ${team2Name}`);
    }

    updateScores();

    // ✅ IMMEDIATELY RE-PROMPT FOR CORRECT WINNER
    let winner = null;

    while (winner === null) {
        const input = prompt(
            `Re-enter correct winner:\n` +
            `1 = ${team1Name}\n` +
            `2 = ${team2Name}\n` +
            `3 = Neither team`
        );

        if (input === null) {
            alert("Re-prompt cancelled. No points awarded.");
            winner = "3";
        }
        else {
            const cleaned = input.trim();

            if (cleaned === "1" || cleaned === "2" || cleaned === "3") {
                winner = cleaned;
            }
            else {
                alert("❌ Invalid input. Please enter ONLY 1, 2, or 3.");
            }
        }
    }

    // ✅ APPLY CORRECTED SCORE
    if (winner === "1") {
        scoreHistory.push({ team: 1, points: points });
        team1Score += points;
        startLoop(correctSound);
        alert(`✅ ${team1Name} gains ${points} points!`);
        stopLoop();
    }
    else if (winner === "2") {
        scoreHistory.push({ team: 2, points: points });
        team2Score += points;
        startLoop(correctSound);
        alert(`✅ ${team2Name} gains ${points} points!`);
        stopLoop();
    }
    else {
        if (Math.floor(Math.random() * 2) == 1) {
            startLoop(incorrectSoundOne);
        } else {
            startLoop(incorrectSoundTwo);
        }
        alert(`❌ No points awarded.`);
        stopLoop();
    }

    updateScores();
}



function setTeamNames() {
    const team1Input = document.getElementById("team1-name-input");
    const team2Input = document.getElementById("team2-name-input");

    team1Name = team1Input.value.trim() || "Player 1";
    team2Name = team2Input.value.trim() || "Player 2";

    document.getElementById("team1-name-label").textContent = team1Name + ":";
    document.getElementById("team2-name-label").textContent = team2Name + ":";
}

// Load clues onto the board
async function loadCluesOnBoard() {
    try {
        const response = await fetch("http://localhost:8080/api/jeopardy");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const allClues = await response.json();
        console.log("Loaded clues:", allClues);

        const clueCells = document.querySelectorAll('.my-table td');

        clueCells.forEach(cell => {
            const category = cell.dataset.category.trim().toLowerCase();
            const points = parseInt(cell.dataset.points);

            // Find clue with case-insensitive category match and exact points
            const clue = allClues.find(c =>
                c.category.trim().toLowerCase() === category &&
                parseInt(c.points) === points
            );

            if (clue) {
                const questionElement = cell.querySelector('.clue-question');
                const answerElement = cell.querySelector('.clue-answer');

                if (questionElement) questionElement.textContent = clue.question;
                if (answerElement) answerElement.textContent = clue.answer;
            } else {
                console.warn(`No clue found for category="${category}" points=${points}`);
            }
        });
    } catch (error) {
        console.error("Failed to load clues:", error);
    }
}


// Wait until the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    updateScores();

    const startBtn = document.getElementById("start-game-btn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            setTeamNames();

            const setupDiv = document.querySelector(".team-setup");
            setupDiv.classList.add("hidden");
        });
    }
    loadCluesOnBoard();

    // Select all table cells that contain point values
    const clueCells = document.querySelectorAll('.my-table td');

    clueCells.forEach(cell => {
        cell.addEventListener('click', () => {
            // Ignore cells that have already been used
            if (cell.classList.contains('used')) return;

            const pointsDisplay = cell.querySelector('.clue-points');
            const clueContent = cell.querySelector('.clue-content');
            const clueAnswer = cell.querySelector('.clue-answer');

            // --- Game Logic ---

            // State 1: Showing the point value (first click → show question)
            if (pointsDisplay && !pointsDisplay.classList.contains('hidden')) {

                stopTimer();

                pointsDisplay.classList.add('hidden');
                clueContent.classList.remove('hidden');
                cell.style.backgroundColor = '#007FFF'; // Active question

                startTimer(() => {
                    clueAnswer.classList.remove("hidden");
                    cell.style.backgroundColor = "#FF0000";
                    alert("⏱ Time's up! No points can be awarded.");
                });

                startLoop(jeopardy);
            }

            // State 2: Showing the question (second click → show answer ONLY)
            else if (clueAnswer && clueAnswer.classList.contains('hidden')) {

                stopTimer();

                clueAnswer.classList.remove('hidden');
                cell.style.backgroundColor = '#FF0000'; // Answer reveal
            }

            // State 3: Scoring + mark as used (third click)
            else {

                stopTimer();

                const points = parseInt(cell.dataset.points); // ✅ ALWAYS use cell value
                let winner = null;

                while (winner === null) {
                    const input = prompt(
                        `Who answered correctly?\n` +
                        `1 = ${team1Name}\n` +
                        `2 = ${team2Name}\n` +
                        `3 = Neither team`
                    );

                    if (input === null) {
                        alert("Selection cancelled. No points awarded.");
                        winner = "3";
                    }
                    else {
                        const cleaned = input.trim();

                        if (cleaned === "1" || cleaned === "2" || cleaned === "3") {
                            winner = cleaned;
                        }
                        else {
                            alert("❌ Invalid input. Please enter ONLY 1, 2, or 3.");
                        }
                    }
                }

                stopLoop();

                if (winner === "1") {
                    scoreHistory.push({ team: 1, points: points });
                    team1Score += points;
                    startLoop(correctSound);
                    alert(`✅ ${team1Name} gains ${points} points!`);
                    stopLoop();
                }
                else if (winner === "2") {
                    scoreHistory.push({ team: 2, points: points });
                    team2Score += points;
                    startLoop(correctSound);
                    alert(`✅ ${team2Name} gains ${points} points!`);
                    stopLoop();
                }
                else {
                    if (Math.floor(Math.random() * 2) == 1) {
                        startLoop(incorrectSoundOne);
                    } else {
                        startLoop(incorrectSoundTwo);
                    }
                    alert(`❌ No points awarded.`);
                    stopLoop();
                }

                updateScores();

                // Final cleanup
                cell.classList.add('used');
                clueContent.classList.add('hidden');
                if (pointsDisplay) pointsDisplay.classList.remove('hidden');
                cell.style.backgroundColor = '';
            }
        });
    });
    function resetBoard() {
        const clueCells = document.querySelectorAll('.my-table td');

        clueCells.forEach(cell => {
            cell.classList.remove('used');
            cell.style.backgroundColor = '#001fba';  // Jeopardy blue

            const pointsDisplay = cell.querySelector('.clue-points');
            const clueContent = cell.querySelector('.clue-content');
            const clueAnswer = cell.querySelector('.clue-answer');

            if (pointsDisplay) pointsDisplay.classList.remove('hidden');
            if (clueContent) clueContent.classList.add('hidden');
            if (clueAnswer) clueAnswer.classList.add('hidden');
        });

        team1Score = 0;
        team2Score = 0;
        updateScores();
        scoreHistory = [];

        // ✅ Reset Team Names
        team1Name = "Player 1";
        team2Name = "Player 2";

        document.getElementById("team1-name-label").textContent = "Player 1:";
        document.getElementById("team2-name-label").textContent = "Player 2:";

        // ✅ Clear Input Fields
        document.getElementById("team1-name-input").value = "";
        document.getElementById("team2-name-input").value = "";

        // ✅ Show Setup Screen Again (Optional but Recommended)
        const setupDiv = document.querySelector(".team-setup");
        setupDiv.classList.remove("hidden");
        loadCluesOnBoard();
    }

    document.getElementById('reset-btn').addEventListener('click', resetBoard);
    document.getElementById('undo-btn').addEventListener('click', undoLastScore);

    document.getElementById("pause-timer-btn").addEventListener("click", () => {
        clearInterval(timerInterval);
    });

    document.getElementById("resume-timer-btn").addEventListener("click", () => {
        const timerDisplay = document.getElementById("timer-display");
        if (timerDisplay.style.display === "none") return;

        clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerDisplay.style.display = "none";
            }
        }, 1000);
    });

    document.getElementById("cancel-timer-btn").addEventListener("click", () => {
        stopTimer();
    });
});
//comment