from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from pydantic import BaseModel

router = APIRouter()

class GridCell(BaseModel):
    row: int
    col: int
    value: str

class SudokuGrid(BaseModel):
    grid: List[List[str]]

class ValidationResponse(BaseModel):
    is_valid: bool
    errors: List[Dict[str, Any]]
    message: str

def calculate_correct_value(row: int, col: int) -> str:
    """
    Calculate the correct value for a cell based on the shifting pattern.
    
    Pattern:
    - Columns 0-2: Start with number 1
    - Columns 3-5: Start with number 2  
    - Columns 6-8: Start with number 3
    
    Within each group:
    - First column: starts at row 0
    - Second column: starts at row 3
    - Third column: starts at row 6
    """
    col_group = col // 3  # 0, 1, or 2
    col_in_group = col % 3  # 0, 1, or 2
    
    # Starting number for this column group
    starting_number = col_group + 1  # 1, 2, or 3
    
    # Starting row for this column within the group
    starting_row = col_in_group * 3  # 0, 3, or 6
    
    # Calculate the actual number at this position
    if row >= starting_row:
        number = starting_number + (row - starting_row)
    else:
        number = starting_number + (row - starting_row + 9)
    
    # Wrap around if number exceeds 9
    if number > 9:
        number = number - 9
    
    return str(number)

def generate_solution_grid() -> List[List[str]]:
    """Generate the complete solution grid based on the shifting pattern."""
    grid = []
    for row in range(9):
        grid_row = []
        for col in range(9):
            grid_row.append(calculate_correct_value(row, col))
        grid.append(grid_row)
    return grid

@router.get("/solution")
async def get_solution():
    """Get the complete solution grid."""
    try:
        solution = generate_solution_grid()
        return {"solution": solution}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/hint")
async def get_hint():
    """Get a random hint (cell position and correct value)."""
    import random
    
    try:
        row = random.randint(0, 8)
        col = random.randint(0, 8)
        value = calculate_correct_value(row, col)
        
        return {
            "row": row,
            "col": col,
            "value": value
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/validate")
async def validate_grid(grid_data: SudokuGrid):
    """Validate the user's grid against the correct pattern."""
    try:
        grid = grid_data.grid
        errors = []
        correct_count = 0
        total_filled = 0
        
        for row in range(9):
            for col in range(9):
                if row < len(grid) and col < len(grid[row]):
                    user_value = grid[row][col].strip()
                    if user_value:
                        total_filled += 1
                        correct_value = calculate_correct_value(row, col)
                        
                        if user_value == correct_value:
                            correct_count += 1
                        else:
                            errors.append({
                                "row": row,
                                "col": col,
                                "user_value": user_value,
                                "correct_value": correct_value
                            })
        
        is_valid = len(errors) == 0 and total_filled == 81
        
        if is_valid:
            message = "Congratulations! Pattern is correct!"
        elif len(errors) > 0:
            message = f"Found {len(errors)} incorrect cells. Check highlighted cells."
        else:
            message = f"Grid incomplete. {81 - total_filled} cells remaining."
        
        return ValidationResponse(
            is_valid=is_valid,
            errors=errors,
            message=message
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/pattern-info")
async def get_pattern_info():
    """Get information about the shifting pattern."""
    return {
        "title": "Sudoku Shifting Pattern Challenge",
        "description": "Master the unique shifting pattern to create a valid Sudoku grid",
        "rules": [
            {
                "group": "Columns 1-3",
                "start_number": 1,
                "details": [
                    "Col 1: Place 1 at row 1, 2 at row 2, ..., 9 at row 9",
                    "Col 2: Place 1 at row 4, 2 at row 5, ..., wrapping to top",
                    "Col 3: Place 1 at row 7, 2 at row 8, ..., wrapping to top"
                ]
            },
            {
                "group": "Columns 4-6", 
                "start_number": 2,
                "details": [
                    "Col 4: Place 2 at row 1, 3 at row 2, ..., wrapping after 9",
                    "Col 5: Place 2 at row 4, 3 at row 5, ..., wrapping around",
                    "Col 6: Place 2 at row 7, 3 at row 8, ..., wrapping around"
                ]
            },
            {
                "group": "Columns 7-9",
                "start_number": 3,
                "details": [
                    "Col 7: Place 3 at row 1, 4 at row 2, ..., wrapping after 9",
                    "Col 8: Place 3 at row 4, 4 at row 5, ..., wrapping around", 
                    "Col 9: Place 3 at row 7, 4 at row 8, ..., wrapping around"
                ]
            }
        ],
        "note": "This creates a valid Sudoku where no number repeats in any row, column, or 3×3 box!"
    }
