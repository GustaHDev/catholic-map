import asyncio
from typing import cast

from graph.models.territory_models import TerritoriesOutput
from graph.prompts.territory_prompts import territory_prompt
from graph.states.agent_state import AgentState

from tools.search_tool import search_territories
from lib.llm import llm


async def territory_node(state: AgentState) -> dict:
    entities = state['entities']
    search_results = await asyncio.gather(*[
        search_territories(entity['name'], entity['start_year'], entity['end_year']) for entity in entities
    ])
    errors = []
    updated_entities = []

    print(f"[religion_node] entities received: {len(entities)}")
    for entity, search_result in zip(entities, search_results):
        prompt = territory_prompt(entity['name'], entity['start_year'], entity['end_year'], search_result)
        structured_llm = llm.with_structured_output(TerritoriesOutput)

        try:
            results: TerritoriesOutput = cast(TerritoriesOutput, await structured_llm.ainvoke(prompt))
        except Exception as e:
            errors.append({"step": "territory_node", "errors": str(e)})
            continue

        updated_entity ={**entity, "territories": []}

        for r in results.territories:

            updated_entity["territories"].append({
                "name": r.name,
                "country_code": r.country_code,
                "start_year": r.start_year,
                "end_year": r.end_year,
                "percentage_controlled": r.percentage_controlled,
            })

        updated_entities.append(updated_entity)
    return {
        "entities": updated_entities,
        "errors": errors
    }