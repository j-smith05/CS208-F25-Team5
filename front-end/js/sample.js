console.log('sample.js is executing...');

document.addEventListener('DOMContentLoaded', () => {
    // Select all Jeopardy buttons
    const tiles = document.querySelectorAll('.tile');

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const cell = tile.closest('td'); // get the parent <td>
            if (!cell || cell.classList.contains('used')) return;

            const clueContent = cell.querySelector('.clue-content');
            const clueQuestion = cell.querySelector('.clue-question');
            const clueAnswer = cell.querySelector('.clue-answer');

            // --- State 1: Show question ---
            if (clueContent && clueContent.classList.contains('hidden')) {
                clueContent.classList.remove('hidden');
                clueQuestion.classList.remove('hidden');
                clueAnswer.classList.add('hidden');
                tile.classList.add('hidden');
                cell.style.backgroundColor = '#007FFF'; // lighter blue
            }
            // --- State 2: Show answer ---
            else if (clueAnswer && clueAnswer.classList.contains('hidden')) {
                clueAnswer.classList.remove('hidden');
                cell.style.backgroundColor = '#FF0000'; // red for answer reveal
            }
            // --- State 3: Mark as used ---
            else {
                cell.classList.add('used');
                clueContent.classList.add('hidden');
                clueAnswer.classList.add('hidden');
                tile.classList.remove('hidden');
                cell.style.backgroundColor = ''; // reset
            }
        });
    });
});
