import React from 'react';
import { GridType, ValidationError } from '../types';
import './SudokuGrid.css';

interface SudokuGridProps {
  grid: GridType;
  errors: ValidationError[];
  onCellChange: (row: number, col: number, value: string) => void;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ grid, errors, onCellChange }) => {
  const isError = (row: number, col: number): boolean => {
    return errors.some(error => error.row === row && error.col === col);
  };

  const isCorrect = (row: number, col: number): boolean => {
    const value = grid[row][col];
    return value !== '' && !isError(row, col);
  };

  const getCellClassName = (row: number, col: number): string => {
    let className = 'cell';
    
    // Add thick borders for 3x3 boxes
    if (col === 2 || col === 5) className += ' thick-right';
    if (row === 2 || row === 5) className += ' thick-bottom';
    
    // Add error/correct styling
    if (isError(row, col)) className += ' error';
    else if (isCorrect(row, col)) className += ' correct';
    
    return className;
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={getCellClassName(rowIndex, colIndex)}
          >
            <input
              type="text"
              maxLength={1}
              value={cell}
              onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
              className="cell-input"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default SudokuGrid;
