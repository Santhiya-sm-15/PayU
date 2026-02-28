from fastapi import APIRouter, Request, Response
import httpx

auth_router = APIRouter()

AUTH_SERVICE_URL = "http://localhost:8001"

@auth_router.api_route("/auth/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def auth_proxy(path: str, request: Request):
    async with httpx.AsyncClient() as client:
        # Forward the request to Auth Service
        response = await client.request(
            method=request.method,
            url=f"{AUTH_SERVICE_URL}/{path}",
            headers=request.headers,
            content=await request.body()
        )

    return Response(
        content=response.content,
        status_code=response.status_code,
        headers=dict(response.headers)
    )