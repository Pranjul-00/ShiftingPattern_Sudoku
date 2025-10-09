import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: linear-gradient(135deg, #0f0f23 0%, #16213e 25%, #1a1a2e 50%, #0f3460 75%, #0f0f23 100%);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    color: #e0e6ff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;

    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(circle at 20% 80%, rgba(74, 144, 226, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(123, 104, 238, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 107, 107, 0.05) 0%, transparent 50%);
      pointer-events: none;
      z-index: -1;
    }
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  code {
    font-family: 'JetBrains Mono', 'Fira Code', source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    background: rgba(74, 144, 226, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(15, 15, 35, 0.5);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #4a90e2, #7b68ee);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #357abd, #6a5acd);
  }

  /* Selection Styling */
  ::selection {
    background: rgba(74, 144, 226, 0.3);
    color: #fff;
  }

  /* Focus Styling */
  *:focus {
    outline: 2px solid #4a90e2;
    outline-offset: 2px;
  }

  /* Button Reset */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  /* Link Reset */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Input Reset */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  /* Smooth transitions for all interactive elements */
  button, a, input, select, textarea {
    transition: all 0.3s ease;
  }
`;

export default GlobalStyles;
