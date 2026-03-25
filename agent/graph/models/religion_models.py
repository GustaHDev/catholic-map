from typing import List
from pydantic import BaseModel

class ReligionOutput(BaseModel):
    religion: str
    start_year: int
    end_year: int

class ReligionsOutput(BaseModel):
    religions: List[ReligionOutput]