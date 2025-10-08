import React, { useState, useCallback } from 'react';
import { GridType, ValidationError } from '../types';
import { api } from '../services/api';
import SudokuGrid from './SudokuGrid';
import Controls from './Controls';
import Message from './Message';
import './SudokuGame.css';

const SudokuGame: React.FC = () => {
  const [grid, setGrid] = useState<GridType>(() => 
    Array(9).fill(null).map(() => Array(9).fill(''))
  );
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCellChange = useCallback((row: number, col: number, value: string) => {
    // Validate input (only numbers 1-9 or empty)
    if (value !== '' && (!/^[1-9]$/.test(value))) {
      return;
    }

    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => [...row]);
      newGrid[row][col] = value;
      return newGrid;
    });

    // Clear errors and message when user makes changes
    setErrors([]);
    setMessage('');
  }, []);

  const checkSolution = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.validateGrid(grid);
      const { errors: validationErrors, message: validationMessage } = response;
      
      setErrors(validationErrors || []);
      setMessage(validationMessage);
    } catch (error) {
      console.error('Error validating solution:', error);
      setMessage('Error checking solution. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetGrid = (): void => {
    setGrid(Array(9).fill(null).map(() => Array(9).fill('')));
    setErrors([]);
    setMessage('');
  };

  const showHint = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.getHint();
      const { row, col, value } = response;
      
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => [...row]);
        newGrid[row][col] = value;
        return newGrid;
      });
      
      setMessage(`Hint: Added ${value} at row ${row + 1}, column ${col + 1}`);
    } catch (error) {
      console.error('Error getting hint:', error);
      setMessage('Error getting hint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const showSolution = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.getSolution();
      const { solution } = response;
      
      setGrid(solution);
      setErrors([]);
      setMessage('Complete solution displayed! Study the pattern.');
    } catch (error) {
      console.error('Error getting solution:', error);
      setMessage('Error getting solution. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sudoku-game">
      <SudokuGrid 
        grid={grid}
        errors={errors}
        onCellChange={handleCellChange}
      />
      
      <Controls
        onCheckSolution={checkSolution}
        onReset={resetGrid}
        onShowHint={showHint}
        onShowSolution={showSolution}
        loading={loading}
      />
      
      <Message message={message} errors={errors} />
    </div>
  );
};

export default SudokuGame;
