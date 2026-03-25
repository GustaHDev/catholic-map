import os
from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic


load_dotenv()

anthropic_key = os.getenv("ANTHROPIC_API_KEY")

if not anthropic_key:
    raise ValueError("ANTHROPIC_API_KEY is not set in .env")

llm = ChatAnthropic(model_name="claude-sonnet-4-20250514", timeout=200, stop=None)