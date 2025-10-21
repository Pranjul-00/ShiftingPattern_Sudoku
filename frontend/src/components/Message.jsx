import React from 'react';
import styled, { css } from 'styled-components';

const MessageContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  max-width: 500px;

  ${props => props.$type === 'success' && css`
    background: rgba(34, 139, 34, 0.2);
    border: 2px solid #228b22;
    color: #90ee90;
  `}

  ${props => props.$type === 'error' && css`
    background: rgba(220, 20, 60, 0.2);
    border: 2px solid #dc143c;
    color: #ff6b6b;
  `}

  ${props => props.$type === 'info' && css`
    background: rgba(30, 144, 255, 0.2);
    border: 2px solid #1e90ff;
    color: #87ceeb;
  `}

  ${props => props.$type === 'default' && css`
    background: rgba(139, 69, 19, 0.2);
    border: 2px solid #8b4513;
    color: #f4e6d7;
  `}
`;

const MessageText = styled.p`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const ErrorDetails = styled.div`
  margin-top: 0.5rem;
  text-align: left;

  p {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  ul {
    margin: 0;
    padding-left: 1.5rem;
  }

  li {
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
    font-weight: normal;
  }
`;

const Message = ({ message, errors }) => {
  if (!message && (!errors || errors.length === 0)) {
    return null;
  }

  const getMessageType = () => {
    if (message.includes('Congratulations')) return 'success';
    if (message.includes('incorrect') || message.includes('Error')) return 'error';
    if (message.includes('Hint') || message.includes('solution displayed')) return 'info';
    return 'default';
  };

  return (
    <MessageContainer $type={getMessageType()}>
      {message && <MessageText>{message}</MessageText>}
      {errors && errors.length > 0 && (
        <ErrorDetails>
          <p>Incorrect cells found:</p>
          <ul>
            {errors.slice(0, 5).map((error, index) => (
              <li key={index}>
                Row {error.row + 1}, Col {error.col + 1}: 
                Expected {error.correct_value}, got {error.user_value}
              </li>
            ))}
            {errors.length > 5 && (
              <li>... and {errors.length - 5} more errors</li>
            )}
          </ul>
        </ErrorDetails>
      )}
    </MessageContainer>
  );
};

export default Message;
