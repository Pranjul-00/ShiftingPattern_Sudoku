from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

from .api.sudoku import router as sudoku_router

app = FastAPI(title="Sudoku Shifting Pattern API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(sudoku_router, prefix="/api", tags=["sudoku"])

# Serve static files (React build)
if os.path.exists("build"):
    app.mount("/static", StaticFiles(directory="build/static"), name="static")
    
    @app.get("/")
    async def serve_react_app():
        return FileResponse("build/index.html")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
