from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.middlewares.auth import AuthMiddleware
from src.api.middlewares.logging import LoggingMiddleware
from src.api.rest.routes import auth_router

app = FastAPI(title="PayU - Main Service", version="1.0")

app.include_router(auth_router)

app.add_middleware(AuthMiddleware)
app.add_middleware(LoggingMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

@app.get("/")
def welcome():
    return {"message": "Welcome to PayU - Main Service"}