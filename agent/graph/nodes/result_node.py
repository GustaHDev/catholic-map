from tools.api_tool import get_map_with_year

from graph.states.agent_state import AgentState


async def result_node(state: AgentState) -> dict:
    year = state['year']
    errors = []

    response = await get_map_with_year(year)

    if isinstance(response, str):
        errors.append({"step": "result_node", "error": response})
    
    return {
        "results": response,
        "errors": errors
    }
