// Create the Sudoku grid
function createGrid() {
    const grid = document.getElementById('sudoku-grid');
    grid.innerHTML = '';
    
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            // Add thick borders for 3x3 boxes
            if (col === 2 || col === 5) cell.classList.add('thick-right');
            if (row === 2 || row === 5) cell.classList.add('thick-bottom');
            
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.dataset.row = row;
            input.dataset.col = col;
            
            // Only allow numbers 1-9
            input.oninput = function(e) {
                const value = e.target.value;
                if (!/^[1-9]?$/.test(value)) {
                    e.target.value = '';
                }
            };
            
            cell.appendChild(input);
            grid.appendChild(cell);
        }
    }
}

// Check if the user's solution matches the pattern
function checkSolution() {
    const inputs = document.querySelectorAll('#sudoku-grid input');
    let allCorrect = true;
    
    // Reset all cell backgrounds
    inputs.forEach(input => {
        input.parentElement.classList.remove('error', 'correct');
    });
    
    // Check each cell against the pattern
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const input = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
            const userValue = input.value;
            const correctValue = calculateCorrectValue(row, col);
            
            if (userValue === correctValue) {
                input.parentElement.classList.add('correct');
            } else if (userValue !== '') {
                input.parentElement.classList.add('error');
                allCorrect = false;
            } else {
                allCorrect = false;
            }
        }
    }
    
    const message = document.getElementById('message');
    if (allCorrect) {
        message.innerHTML = '<p style="color: green;">Congratulations! Pattern is correct!</p>';
    } else {
        message.innerHTML = '<p style="color: red;">Some cells are incorrect. Check the red highlighted cells.</p>';
    }
}

// Calculate what the value should be based on the pattern
function calculateCorrectValue(row, col) {
    // This implements your described pattern
    const baseNumber = (Math.floor(col / 3) + row) % 9 + 1;
    const shift = (col % 3) * 3;
    const finalNumber = (baseNumber + shift - 1) % 9 + 1;
    
    return finalNumber.toString();
}

function resetGrid() {
    const inputs = document.querySelectorAll('#sudoku-grid input');
    inputs.forEach(input => {
        input.value = '';
        input.parentElement.classList.remove('error', 'correct');
    });
    document.getElementById('message').innerHTML = '';
}

function showHint() {
    // Fill one correct cell as a hint
    const emptyInputs = Array.from(document.querySelectorAll('#sudoku-grid input'))
        .filter(input => input.value === '');
    
    if (emptyInputs.length > 0) {
        const randomInput = emptyInputs[Math.floor(Math.random() * emptyInputs.length)];
        const row = parseInt(randomInput.dataset.row);
        const col = parseInt(randomInput.dataset.col);
        randomInput.value = calculateCorrectValue(row, col);
    }
}

// Initialize the grid when page loads
document.addEventListener('DOMContentLoaded', function() {
    createGrid();
});
