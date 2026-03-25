from typing import Optional, TypedDict, List

from .religion_state import ReligionState
from .territory_state import TerritoryState


class EntityState(TypedDict):
    id: Optional[str]
    name: str
    start_year: int
    end_year: int
    color: str
    ai_generated: bool
    religions: Optional[List[ReligionState]]
    territories: Optional[List[TerritoryState]]