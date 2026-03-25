from typing import List
from pydantic import BaseModel

class EntityOutput(BaseModel):
    name: str
    start_year: int
    end_year: int
    color: str
    ai_generated: bool  

class EntitiesOutput(BaseModel):
    entities: List[EntityOutput]