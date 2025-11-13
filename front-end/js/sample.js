import {getQuestion} from "../../back-end/db";

console.log('sample.js is executing...');

let team1Score = 0;
let team2Score = 0;

function updateScores() {
    document.getElementById('team1-score').textContent = team1Score;
    document.getElementById('team2-score').textContent = team2Score;
}
// Load clues onto the board
async function loadCluesOnBoard() {
    try {
        const allClues = await getQuestion();
        const clueCells = document.querySelectorAll('.my-table td');

        clueCells.forEach(cell => {
            const category = cell.dataset.category;
            const points = parseInt(cell.dataset.points);
            const clue = allClues.find(c => c.category === category && c.points === points);

            if (clue) {
                const questionElement = cell.querySelector('.clue-question');
                const answerElement = cell.querySelector('.clue-answer');
                if (questionElement) questionElement.textContent = clue.question;
                if (answerElement) answerElement.textContent = clue.answer;
            }
        });
    } catch (error) {
        console.error("Failed to load clues:", error);
    }
}

// Wait until the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {

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
                const winner = prompt(`Who answered correctly? (Enter 1 for Player 1, 2 for Player 2, or leave blank if no one)`);

                if (winner === '1') {
                    team1Score += points;
                    alert(`✅ Player 1 gains ${points} points!`);
                } else if (winner === '2') {
                    team2Score += points;
                    alert(`✅ Player 2 gains ${points} points!`);
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
});
