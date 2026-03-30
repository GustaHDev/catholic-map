from fastapi import APIRouter

from app.models.generate_models import GenerateRequest
from graph.states.agent_state import AgentState
from graph.graph import app

router = APIRouter()

@router.post("/generate")
async def generate(request: GenerateRequest):
    initial_state: AgentState = {
            "year": request.year,
            "entities": [],
            "errors": [],
            "results": None
    }

    result = await app.ainvoke(initial_state)
    return result