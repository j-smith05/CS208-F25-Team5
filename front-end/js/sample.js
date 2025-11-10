console.log('sample.js is executing...');

// Wait until the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
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
