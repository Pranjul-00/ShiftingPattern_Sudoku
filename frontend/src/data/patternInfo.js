export const patternInfo = {
  title: "Sudoku Shifting Pattern",
  description: "Master the unique shifting pattern to create a valid",
  rules: [
    {
      group: "Columns 1-3",
      start_number: 1,
      details: [
        "Col 1: Place 1 at row 1, 2 at row 2, ..., 9 at row 9",
        "Col 2: Place 1 at row 4, 2 at row 5, ..., wrapping to top",
        "Col 3: Place 1 at row 7, 2 at row 8, ..., wrapping to top"
      ]
    },
    {
      group: "Columns 4-6", 
      start_number: 2,
      details: [
        "Col 4: Place 2 at row 1, 3 at row 2, ..., wrapping after 9",
        "Col 5: Place 2 at row 4, 3 at row 5, ..., wrapping around",
        "Col 6: Place 2 at row 7, 3 at row 8, ..., wrapping around"
      ]
    },
    {
      group: "Columns 7-9",
      start_number: 3,
      details: [
        "Col 7: Place 3 at row 1, 4 at row 2, ..., wrapping after 9",
        "Col 8: Place 3 at row 4, 4 at row 5, ..., wrapping around", 
        "Col 9: Place 3 at row 7, 4 at row 8, ..., wrapping around"
      ]
    }
  ],
  note: "This creates a valid Sudoku where no number repeats in any row, column, or 3×3 box!"
};
