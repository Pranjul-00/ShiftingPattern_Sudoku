import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 50px);
  grid-template-rows: repeat(9, 50px);
  gap: 1px;
  border: 3px solid #8b4513;
  background: #8b4513;
  border-radius: 5px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    grid-template-columns: repeat(9, 40px);
    grid-template-rows: repeat(9, 40px);
  }
`;

const Cell = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #654321;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background: #2c1810;
  transition: background-color 0.3s ease;
  position: relative;

  &:hover {
    background: #3d2317;
  }

  ${props => props.$thickRight && css`
    border-right: 3px solid #8b4513;
  `}

  ${props => props.$thickBottom && css`
    border-bottom: 3px solid #8b4513;
  `}

  ${props => props.$isError && css`
    background-color: #dc143c !important;
    animation: ${pulse} 0.5s ease-in-out;
  `}

  ${props => props.$isCorrect && css`
    background-color: #228b22 !important;
  `}

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

const CellInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  text-align: center;
  font-size: 1.2rem;
  background: transparent;
  color: #f4e6d7;
  font-weight: bold;
  outline: none;

  &:focus {
    background: rgba(220, 20, 60, 0.1);
    color: #dc143c;
  }

  ${props => (props.$isError || props.$isCorrect) && css`
    color: white !important;
  `}

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SudokuGrid = ({ grid, errors, onCellChange }) => {
  const isError = (row, col) => {
    return errors.some(error => error.row === row && error.col === col);
  };

  const isCorrect = (row, col) => {
    const value = grid[row][col];
    return value !== '' && !isError(row, col);
  };

  return (
    <Grid>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const cellIsError = isError(rowIndex, colIndex);
          const cellIsCorrect = isCorrect(rowIndex, colIndex);
          
          return (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              $isError={cellIsError}
              $isCorrect={cellIsCorrect}
              $thickRight={colIndex === 2 || colIndex === 5}
              $thickBottom={rowIndex === 2 || rowIndex === 5}
            >
              <CellInput
                type="text"
                maxLength={1}
                value={cell}
                onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
                $isError={cellIsError}
                $isCorrect={cellIsCorrect}
              />
            </Cell>
          );
        })
      )}
    </Grid>
  );
};

export default SudokuGrid;
