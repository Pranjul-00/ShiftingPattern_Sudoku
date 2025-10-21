import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import SudokuGame from './components/SudokuGame';
import Instructions from './components/Instructions';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 3rem 0;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  gap: 3rem;
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
    padding: 0 1rem;
  }
`;

const ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(74, 144, 226, 0.05) 0%, 
      transparent 50%, 
      rgba(123, 104, 238, 0.05) 100%);
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    padding: 1.5rem;
    border-radius: 15px;
  }
`;

const App = () => {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Container>
          <ContentWrapper>
            <Instructions />
          </ContentWrapper>
          <ContentWrapper>
            <SudokuGame />
          </ContentWrapper>
        </Container>
      </MainContent>
      <Footer />
    </AppContainer>
  );
};

export default App;
