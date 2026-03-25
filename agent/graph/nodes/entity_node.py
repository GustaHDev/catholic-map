from typing import List, cast
from states.entity_state import EntityState
from tools.api_tool import save_entity
from models.entity_models import EntitiesOutput
from prompts.entity_prompts import entity_prompt
from lib.llm import llm
from tools.search_tool import search_entities
from graph.states import AgentState

async def entity_node(state: AgentState) -> dict:
    year = state["year"]
    search_results = await search_entities(year)
    prompt = entity_prompt(year, search_results)

    structured_llm = llm.with_structured_output(EntitiesOutput)
    results: EntitiesOutput = cast(EntitiesOutput, await structured_llm.ainvoke(prompt))

    entities = results.entities

    errors = []
    entity_states: List[EntityState] = []
    for e in entities:
        response = await save_entity(e.name, e.start_year, e.end_year, e.color, e.ai_generated)

        if isinstance(response, str):
            errors.append({"step": "entity_node", "error": response})
        else:
            entity_states.append({
                "id": response["id"],
                "name": e.name,
                "start_year": e.start_year,
                "end_year": e.end_year,
                "color": e.color,
                "ai_generated": e.ai_generated,
                "religions": None,
                "territories": None
            })

    return {
        "entities": entity_states,
        "errors": errors
    }
