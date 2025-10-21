#!/bin/bash

echo "Starting development servers..."
echo ""

echo "Installing Python dependencies..."
source venv/bin/activate
pip install -r requirements.txt

echo ""
echo "Starting FastAPI server on port 8000..."
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000 &
FASTAPI_PID=$!

echo "Waiting 3 seconds for FastAPI to start..."
sleep 3

echo "Starting React development server on port 3000..."
cd frontend
npm start &
REACT_PID=$!

echo ""
echo "Both servers are starting!"
echo "- FastAPI: http://localhost:8000"
echo "- React: http://localhost:3000"
echo ""
echo "Use React dev server (port 3000) for development with live reloading."
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $FASTAPI_PID 2>/dev/null
    kill $REACT_PID 2>/dev/null
    echo "Servers stopped."
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for background processes
wait
