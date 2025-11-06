console.log('sample.js is executing...');

//TODO: Add any functions that interact with the API and update the HTML by manipulating the DOM
document.addEventListener('DOMContentLoaded', () => {
    // Get all the cells (td elements) that have point values
    const clueCells = document.querySelectorAll('.my-table td');

    clueCells.forEach(cell => {
        cell.addEventListener('click', () => {
            // Check if the cell has already been used
            if (cell.classList.contains('used')) {
                return; // Do nothing if it's already used
            }

            const pointsDisplay = cell.querySelector('.clue-points');
            const clueContent = cell.querySelector('.clue-content');
            const clueAnswer = cell.querySelector('.clue-answer');

            // --- Game Logic ---

            // State 1: Currently showing the point value
            if (pointsDisplay && !pointsDisplay.classList.contains('hidden')) {
                // HIDE the points, SHOW the question (clue-content)
                pointsDisplay.classList.add('hidden');
                clueContent.classList.remove('hidden');

                // Update the cell's background to a different color (optional)
                cell.style.backgroundColor = '#007FFF'; // Lighter blue for active question
            }

            // State 2: Currently showing the Clue Question
            else if (clueAnswer && clueAnswer.classList.contains('hidden')) {
                // SHOW the answer for verification
                clueAnswer.classList.remove('hidden');

                // Change background color to signal 'answer revealed' (optional)
                cell.style.backgroundColor = '#FF0000'; // Red for answer time
            }

            // State 3: Answer has been revealed (time to mark it used)
            else {
                // Mark the cell as used (gray it out)
                cell.classList.add('used');

                // Hide everything inside the cell to clean up the display
                clueContent.classList.add('hidden');
            }
        });
    });
});