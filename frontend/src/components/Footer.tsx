import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #0f0f23, #1a1a2e);
  color: #e0e6ff;
  padding: 3rem 0 1rem;
  margin-top: auto;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #4a90e2, transparent);
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #4a90e2;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 30px;
      height: 2px;
      background: linear-gradient(90deg, #4a90e2, #7b68ee);
      border-radius: 1px;
    }
  }

  p {
    line-height: 1.6;
    opacity: 0.9;
    margin-bottom: 1rem;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #e0e6ff;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: #4a90e2;
      transform: translateX(5px);
    }

    &::before {
      content: '→';
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover::before {
      opacity: 1;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4a90e2, #7b68ee);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.2rem;

  &:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 8px 25px rgba(74, 144, 226, 0.4);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(74, 144, 226, 0.2);
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  margin: 0;
  opacity: 0.7;
  font-size: 0.9rem;
`;

const TechStack = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const TechBadge = styled.span`
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.3);
  color: #4a90e2;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(74, 144, 226, 0.2);
    transform: translateY(-1px);
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>About Sudoku Master</h3>
            <p>
              Master the art of Sudoku with our innovative shifting pattern method. 
              Learn systematic approaches to solve even the most challenging puzzles 
              with confidence and speed.
            </p>
            <SocialLinks>
              <SocialIcon href="#" title="GitHub">
                ⚡
              </SocialIcon>
              <SocialIcon href="#" title="Twitter">
                🐦
              </SocialIcon>
              <SocialIcon href="#" title="Discord">
                💬
              </SocialIcon>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Learning Resources</h3>
            <FooterLinks>
              <li><a href="#tutorial">Interactive Tutorial</a></li>
              <li><a href="#patterns">Pattern Recognition</a></li>
              <li><a href="#strategies">Advanced Strategies</a></li>
              <li><a href="#tips">Pro Tips & Tricks</a></li>
              <li><a href="#challenges">Daily Challenges</a></li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Community</h3>
            <FooterLinks>
              <li><a href="#leaderboard">Leaderboard</a></li>
              <li><a href="#tournaments">Tournaments</a></li>
              <li><a href="#forums">Discussion Forums</a></li>
              <li><a href="#feedback">Send Feedback</a></li>
              <li><a href="#support">Get Support</a></li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Quick Stats</h3>
            <p>🎯 <strong>Accuracy:</strong> Track your solving precision</p>
            <p>⚡ <strong>Speed:</strong> Improve your completion time</p>
            <p>🧠 <strong>Patterns:</strong> Master shifting techniques</p>
            <p>🏆 <strong>Progress:</strong> Level up your skills</p>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            © 2024 Sudoku Master. Crafted with ❤️ for puzzle enthusiasts.
          </Copyright>
          <TechStack>
            <TechBadge>React</TechBadge>
            <TechBadge>TypeScript</TechBadge>
            <TechBadge>Styled Components</TechBadge>
            <TechBadge>Python</TechBadge>
          </TechStack>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
