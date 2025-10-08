import React from 'react';
import { ValidationError } from '../types';
import './Message.css';

interface MessageProps {
  message: string;
  errors: ValidationError[];
}

const Message: React.FC<MessageProps> = ({ message, errors }) => {
  if (!message && (!errors || errors.length === 0)) {
    return null;
  }

  const getMessageType = (): string => {
    if (message.includes('Congratulations')) return 'success';
    if (message.includes('incorrect') || message.includes('Error')) return 'error';
    if (message.includes('Hint') || message.includes('solution displayed')) return 'info';
    return 'default';
  };

  return (
    <div className={`message message-${getMessageType()}`}>
      {message && <p>{message}</p>}
      {errors && errors.length > 0 && (
        <div className="error-details">
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
        </div>
      )}
    </div>
  );
};

export default Message;
