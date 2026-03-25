from fastapi import APIRouter

router = APIRouter()

@router.post("/generate")
async def generate():
    return {"message": "generate route"}