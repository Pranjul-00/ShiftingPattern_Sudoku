import React from 'react';
import styled from 'styled-components';
import SudokuGame from './components/SudokuGame';
import Instructions from './components/Instructions';

const AppContainer = styled.div`
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
  }
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Container>
        <Instructions />
        <SudokuGame />
      </Container>
    </AppContainer>
  );
};

export default App;
