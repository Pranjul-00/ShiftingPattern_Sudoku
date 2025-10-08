import React from 'react';
import './App.css';
import SudokuGame from './components/SudokuGame';
import Instructions from './components/Instructions';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <Instructions />
        <SudokuGame />
      </div>
    </div>
  );
};

export default App;
