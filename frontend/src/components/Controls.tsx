import React from 'react';
import './Controls.css';

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
    <div className="controls">
      <button 
        onClick={onCheckSolution} 
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? 'Checking...' : 'Check Solution'}
      </button>
      
      <button 
        onClick={onReset} 
        disabled={loading}
        className="btn btn-secondary"
      >
        Reset Grid
      </button>
      
      <button 
        onClick={onShowHint} 
        disabled={loading}
        className="btn btn-hint"
      >
        {loading ? 'Getting Hint...' : 'Show Hint'}
      </button>
      
      <button 
        onClick={onShowSolution} 
        disabled={loading}
        className="btn btn-solution"
      >
        {loading ? 'Loading...' : 'Show Solution'}
      </button>
    </div>
  );
};

export default Controls;
