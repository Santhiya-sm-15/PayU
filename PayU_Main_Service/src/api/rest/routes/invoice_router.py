from fastapi import APIRouter, Request, Response
import httpx

INVOICE_SERVICE_URL = "http://localhost:8002" 

invoice_router = APIRouter()

@invoice_router.api_route("/invoice/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def invoice_proxy(path: str, request: Request):
    async with httpx.AsyncClient() as client:
        # Forward the request to Invoice Service
        response = await client.request(
            method=request.method,
            url=f"{INVOICE_SERVICE_URL}/{path}",
            headers=request.headers,
            content=await request.body()
        )

    return Response(
        content=response.content,
        status_code=response.status_code,
        headers=dict(response.headers)
    )