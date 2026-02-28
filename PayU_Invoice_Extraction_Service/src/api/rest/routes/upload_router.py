from fastapi import APIRouter, Depends
from core.security.jwt_handler import get_current_user

upload_router = APIRouter("/upload")

@upload_router.post("/invoice")
async def upload_invoices(user = Depends(get_current_user)):
    pass

@upload_router.post("/purchase_order")
async def upload_purchase_orders(user = Depends(get_current_user)):
    pass
