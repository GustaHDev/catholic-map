from pydantic import BaseModel


class GenerateRequest(BaseModel):
    year: int