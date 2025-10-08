import React from 'react';
import styled, { css } from 'styled-components';

const ControlsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

interface ButtonProps {
  $variant: 'primary' | 'secondary' | 'hint' | 'solution';
}

const Button = styled.button<ButtonProps>`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background: linear-gradient(145deg, #8b4513, #654321);
  color: #f4e6d7;
  border: 2px solid #dc143c;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  min-width: 120px;

  &:hover:not(:disabled) {
    background: linear-gradient(145deg, #a0522d, #8b4513);
    border-color: #ff6347;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  ${props => props.$variant === 'primary' && css`
    border-color: #dc143c;
  `}

  ${props => props.$variant === 'secondary' && css`
    border-color: #ff8c00;
  `}

  ${props => props.$variant === 'hint' && css`
    border-color: #32cd32;
  `}

  ${props => props.$variant === 'solution' && css`
    border-color: #9370db;
  `}

  @media (max-width: 768px) {
    width: 100%;
    max-width: 200px;
  }
`;

interface ControlsProps {
  onCheckSolution: () => void;
  onReset: () => void;
  onShowHint: () => void;
  onShowSolution: () => void;
  loading: boolean;
}

const Controls: React.FC<ControlsProps> = ({ 
  onCheckSolution, 
  onReset, 
  onShowHint, 
  onShowSolution, 
  loading 
}) => {
  return (
    <ControlsContainer>
      <Button 
        onClick={onCheckSolution} 
        disabled={loading}
        $variant="primary"
      >
        {loading ? 'Checking...' : 'Check Solution'}
      </Button>
      
      <Button 
        onClick={onReset} 
        disabled={loading}
        $variant="secondary"
      >
        Reset Grid
      </Button>
      
      <Button 
        onClick={onShowHint} 
        disabled={loading}
        $variant="hint"
      >
        {loading ? 'Getting Hint...' : 'Show Hint'}
      </Button>
      
      <Button 
        onClick={onShowSolution} 
        disabled={loading}
        $variant="solution"
      >
        {loading ? 'Loading...' : 'Show Solution'}
      </Button>
    </ControlsContainer>
  );
};

export default Controls;
