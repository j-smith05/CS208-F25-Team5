
console.log('sample.js is executing...');

let team1Score = 0;
let team2Score = 0;

let team1Name = "Player 1";
let team2Name = "Player 2";

let currentAudio = null;
let isLooping = false;


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
        currentAudio.pause;
        currentAudio.currentTime = 0;
        currentAudio.removeEventListener('ended', loopHandler);
        currentAudio = null;
    }
}

function updateScores() {
    document.getElementById('team1-score').textContent = team1Score;
    document.getElementById('team2-score').textContent = team2Score;
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

            // State 1: Showing the point value (first click)
            if (pointsDisplay && !pointsDisplay.classList.contains('hidden')) {
                pointsDisplay.classList.add('hidden');
                clueContent.classList.remove('hidden');
                cell.style.backgroundColor = '#007FFF'; // Lighter blue for active question
            }
            // State 2: Showing the question (second click)
            else if (clueAnswer && clueAnswer.classList.contains('hidden')) {
                clueAnswer.classList.remove('hidden');
                cell.style.backgroundColor = '#FF0000'; // Red for answer reveal

                // --- Ask which team got it right ---
                const points = parseInt(cell.dataset.points);
                const winner = prompt(`Who answered correctly? (Enter 1 for ${team1Name}, 2 for ${team2Name}, or leave blank if no one)`);


                if (winner === '1') {
                    team1Score += points;
                    alert(`✅ ${team1Name} gains ${points} points!`);
                } else if (winner === '2') {
                    team2Score += points;
                    alert(`✅ ${team2Name} gains ${points} points!`);
                } else {
                    alert(`❌ No points awarded.`);
                }
                updateScores();
            }


            // State 3: Mark as used (third click)
            else {
                cell.classList.add('used');
                clueContent.classList.add('hidden');
                if (pointsDisplay) pointsDisplay.classList.remove('hidden');
                cell.style.backgroundColor = ''; // Reset background
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

        loadCluesOnBoard();
    }

    document.getElementById('reset-btn').addEventListener('click', resetBoard);

});
//comment