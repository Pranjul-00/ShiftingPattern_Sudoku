import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  transform: rotate(-5deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(0deg) scale(1.1);
  }
`;

const LogoText = styled.div`
  h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #fff, #e0e6ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
    font-weight: 300;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);

    &::before {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 0.3rem 0.8rem;
    font-size: 0.9rem;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <LogoIcon>9×9</LogoIcon>
          <LogoText>
            <h1>Sudoku Master</h1>
            <p>Shifting Pattern Method</p>
          </LogoText>
        </Logo>
        <NavLinks>
          <NavLink href="#learn">Learn</NavLink>
          <NavLink href="#practice">Practice</NavLink>
          <NavLink href="#about">About</NavLink>
        </NavLinks>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
