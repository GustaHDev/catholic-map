from typing import Optional, TypedDict, List

from .entity_state import EntityState


class AgentState(TypedDict):
    year: int
    entities: List[EntityState]
    errors: List[dict]
    results: Optional[List[dict]]