import asyncio
from typing import cast

from models.territory_models import TerritoriesOutput
from lib.llm import llm
from prompts.territory_prompts import territory_prompt
from tools.search_tool import search_territories
from states.agent_state import AgentState


async def territory_node(state: AgentState) -> dict:
    entities = state['entities']
    search_results = await asyncio.gather(*[
        search_territories(entity['name'], entity['start_year'], entity['end_year']) for entity in entities
    ])
    # errors = []
    territories = []

    for entity, search_result in zip(entities, search_results):
        prompt = territory_prompt(entity['name'], entity['start_year'], entity['end_year'], search_result)
        structured_llm = llm.with_structured_output(TerritoriesOutput)
        results: TerritoriesOutput = cast(TerritoriesOutput, await structured_llm.ainvoke(prompt))
        
        for r in results.territories:

            # check errors?

            territories.append({
                "name": r.name,
                "start_year": r.start_year,
                "end_year": r.end_year,
                "percentage_controlled": r.percentage_controlled,
            })

    return {
        "territories": territories,
        # "errors": errors
    }