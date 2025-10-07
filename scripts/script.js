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

// Calculate what the value should be based on the shifting pattern
function calculateCorrectValue(row, col) {
    // Implement the user's shifting pattern:
    // Col 0: 1 at (0,0), 2 at (1,0), ..., 9 at (8,0)
    // Col 1: 1 at (3,1), 2 at (4,1), ..., wrapping around
    // Col 2: 1 at (6,2), 2 at (7,2), ..., wrapping around
    // Col 3: 2 at (0,3), 3 at (1,3), ..., wrapping around
    // And so on...
    
    const colGroup = Math.floor(col / 3); // 0, 1, or 2
    const colInGroup = col % 3; // 0, 1, or 2
    
    // Starting number for this column group
    const startingNumber = colGroup + 1; // 1, 2, or 3
    
    // Starting row for this column within the group
    const startingRow = colInGroup * 3; // 0, 3, or 6
    
    // Calculate the actual number at this position
    let number;
    if (row >= startingRow) {
        number = startingNumber + (row - startingRow);
    } else {
        number = startingNumber + (row - startingRow + 9);
    }
    
    // Wrap around if number exceeds 9
    if (number > 9) {
        number = number - 9;
    }
    
    return number.toString();
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

function showSolution() {
    // Fill the entire grid with the correct solution
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const input = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
            input.value = calculateCorrectValue(row, col);
        }
    }
    
    const message = document.getElementById('message');
    message.innerHTML = '<p style="color: #dc143c;">Complete solution displayed! Study the pattern.</p>';
}

// Initialize the grid when page loads
document.addEventListener('DOMContentLoaded', function() {
    createGrid();
});
