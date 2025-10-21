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

# Serve static files (React build) - only in production
if os.path.exists("build") and os.getenv("ENVIRONMENT") == "production":
    app.mount("/static", StaticFiles(directory="build/static"), name="static")
    
    @app.get("/")
    async def serve_react_app():
        return FileResponse("build/index.html")
    
    # Catch-all route for React Router (SPA)
    @app.get("/{full_path:path}")
    async def serve_react_app_catchall(full_path: str):
        # Don't serve React app for API routes
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="Not found")
        return FileResponse("build/index.html")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
