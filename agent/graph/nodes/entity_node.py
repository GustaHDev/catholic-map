from typing import List, cast

from graph.states.agent_state import AgentState
from graph.states.entity_state import EntityState
from graph.models.entity_models import EntitiesOutput
from graph.prompts.entity_prompts import entity_prompt

from tools.api_tool import save_entity
from tools.search_tool import search_entities

from lib.llm import llm

async def entity_node(state: AgentState) -> dict:
    year = state["year"]
    search_results = await search_entities(year)
    prompt = entity_prompt(year, search_results)

    structured_llm = llm.with_structured_output(EntitiesOutput)

    print(f"[entity_node] search results length: {len(search_results)}")
    results: EntitiesOutput = cast(EntitiesOutput, await structured_llm.ainvoke(prompt))
    print(f"[entity_node] LLM extracted {len(results.entities)} entities")

    entities = results.entities

    errors = []
    entity_states: List[EntityState] = []
    for e in entities:
        print(f"[entity_node] saving entity: name={e.name}, start={e.start_year}, end={e.end_year}, color={e.color}, ai_generated={e.ai_generated}")
        payload = {
            "name": e.name,
            "start_year": e.start_year,
            "end_year": e.end_year,
            "color": e.color,
            "ai_generated": e.ai_generated
        }
        response = await save_entity(payload["name"], payload["start_year"], payload["end_year"], payload["color"], payload["ai_generated"])
        print(f"[entity_node] save_entity response: {response}")

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

    print(f"[entity_node] returning {len(entity_states)} entities")
    return {
        "entities": entity_states,
        "errors": errors
    }
