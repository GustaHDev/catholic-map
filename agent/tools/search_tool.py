from dotenv import load_dotenv
from langchain_tavily import TavilySearch


load_dotenv()

tavily = TavilySearch(max_results=10, topic="history", search_depth="advanced")

async def search_entities(year: int) -> str:
    """
        search in the web for historical entities that were active in a determined year.

        Args:
            year: Year the user asks for
        
        Returns:
            A string with information from all found entities
    """
    query = f"major empires, kingdoms and states that existed in {year} AD"

    print(f"[search_tool] searching for: {query}")

    try:
        response = await tavily.ainvoke(query)

        context = [f"- {r['title']}: {r['content']}" for r in response.get('results', [])]
        return "\n".join(context)
    except Exception as e:
        return f"Error while searching: {str(e)}"

async def search_religions(entity_name: str, entity_start_year: int, entity_end_year: int) -> str:
    """
        search in the web for religions a historical entity had along its existence.

        Args:
            entity_name: Name of the entity to search
            entity_start_year: The year the entity started
            entity_end_year: The year the entity ended
        
        Returns:
            A string with information from all found religions
    """

    query = f"religions for {entity_name} between {entity_start_year} and {entity_end_year}"

    print(f"[search_tool] searching for: {query}")

    try:
        response = await tavily.ainvoke(query)

        context = [f"- {r['title']}: {r['content']}" for r in response.get('results', [])]
        return "\n".join(context)
    except Exception as e:
        return f"Error while searching: {str(e)}"
    
async def search_territories(entity_name: str, entity_start_year: int, entity_end_year: int) -> str:
    """
        search in the web for all modern territories a historical entity had along its existence.

        Args:
            entity_name: Name of the entity to search
            entity_start_year: The year the entity started
            entity_end_year: The year the entity ended
        
        Returns:
            A string with information from all found territories
    """

    query = f"modern territories that {entity_name} had from {entity_start_year} to {entity_end_year}"

    print(f"[search_tool] searching for: {query}")

    try:
        response = await tavily.ainvoke(query)

        context = [f"- {r['title']}: {r['content']}" for r in response.get('results', [])]
        return "\n".join(context)
    except Exception as e:
        return f"Error while searching: {str(e)}"