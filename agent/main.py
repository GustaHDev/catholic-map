from dotenv import load_dotenv
from fastapi import FastAPI
from app.api.generate import router

load_dotenv()

app = FastAPI()
app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Hello World"}