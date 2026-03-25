from typing import TypedDict


class ReligionState(TypedDict):
    religion: str
    entity_id: str | None
    start_year: int
    end_year: int