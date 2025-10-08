# Sudoku Shifting Pattern Challenge

A modern web application built with **React TypeScript** frontend and **FastAPI** backend that challenges users to master a unique shifting pattern to create valid Sudoku grids.

## 🎯 Features

- **Interactive Sudoku Grid**: 9x9 grid with visual feedback for correct/incorrect entries
- **Pattern-Based Logic**: Unique shifting pattern algorithm for generating valid Sudoku solutions
- **Real-time Validation**: Instant feedback on user input with error highlighting
- **Hint System**: Get hints for individual cells when stuck
- **Solution Display**: View the complete solution to study the pattern
- **Responsive Design**: Works on desktop and mobile devices
- **Modern Tech Stack**: React with TypeScript + FastAPI with Python

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Components**: Modular component architecture
- **Styling**: CSS-in-JS with styled-components
- **API Client**: Axios for HTTP requests
- **Type Safety**: Full TypeScript integration

### Backend (FastAPI + Python)
- **Framework**: FastAPI with Pydantic models
- **API Endpoints**: RESTful API design
- **Pattern Logic**: Mathematical algorithm for shifting pattern
- **Validation**: Server-side grid validation
- **CORS**: Configured for frontend integration

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose

### Option 1: Docker (Recommended)
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Option 2: Manual Setup

#### Backend Setup
```bash
# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start React development server
npm start
```

## 🌐 Access Points

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **API Health Check**: http://localhost:8000/health

## 🎮 How to Play

1. **Understand the Pattern**: Study the shifting pattern rules in the instructions panel
2. **Fill the Grid**: Enter numbers 1-9 in the Sudoku grid following the pattern
3. **Get Hints**: Use the "Show Hint" button when you need help
4. **Validate**: Click "Check Solution" to see if your pattern is correct
5. **Study**: Use "Show Solution" to see the complete pattern

## 📁 Project Structure

```
ShiftingPattern_Sudoku/
├── app/                          # FastAPI Backend
│   ├── main.py                   # FastAPI application entry point
│   ├── api/
│   │   └── sudoku.py            # Sudoku API endpoints
│   └── __init__.py
├── frontend/                     # React TypeScript Frontend
│   ├── public/
│   │   └── index.html           # HTML template
│   ├── src/
│   │   ├── components/          # React components (with styled-components)
│   │   │   ├── SudokuGame.tsx
│   │   │   ├── SudokuGrid.tsx
│   │   │   ├── Instructions.tsx
│   │   │   ├── Controls.tsx
│   │   │   └── Message.tsx
│   │   ├── services/
│   │   │   └── api.ts           # API client
│   │   ├── types/
│   │   │   └── index.ts         # TypeScript type definitions
│   │   ├── App.tsx              # Main App component
│   │   ├── GlobalStyles.tsx     # Global styled-components
│   │   └── index.tsx            # React entry point
│   ├── package.json             # Node.js dependencies
│   └── tsconfig.json            # TypeScript configuration
├── .gitattributes               # Git language detection rules
├── requirements.txt             # Python dependencies
├── compose.yaml                 # Docker Compose configuration
├── Dockerfile                   # Docker container configuration
└── README.md                    # This file
```

## 🔧 API Endpoints

- `GET /api/pattern-info` - Get pattern rules and instructions
- `POST /api/validate` - Validate user's grid against the pattern
- `GET /api/hint` - Get a random hint (cell position and value)
- `GET /api/solution` - Get the complete solution grid
- `GET /health` - Health check endpoint

## 🎨 Pattern Algorithm

The shifting pattern follows these rules:

1. **Columns 1-3**: Start with number 1
   - Col 1: 1 at row 1, 2 at row 2, ..., 9 at row 9
   - Col 2: 1 at row 4, wrapping around
   - Col 3: 1 at row 7, wrapping around

2. **Columns 4-6**: Start with number 2
   - Similar shifting pattern with offset

3. **Columns 7-9**: Start with number 3
   - Similar shifting pattern with offset

This creates a mathematically valid Sudoku where no number repeats in any row, column, or 3×3 box.

## 🐳 Docker Support

The project includes Docker configuration for containerized deployment:

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.
