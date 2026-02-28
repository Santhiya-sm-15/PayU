from fastapi import FastAPI
from src.api.rest.app import app_router

app = FastAPI(title="PayU - Invoice Extraction Service", version="1.0")

app.include_router(app_router)

@app.get("/")
def welcome():
    return {"message": "Welcome to PayU - Invoice Extraction Service"}