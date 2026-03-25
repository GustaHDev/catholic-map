from typing import List

from pydantic import BaseModel


class TerritoryOutput(BaseModel):
    name: str
    start_year: int
    end_year: int
    percentage_controlled: float

class TerritoriesOutput(BaseModel):
    territories: List[TerritoryOutput]