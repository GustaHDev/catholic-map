import asyncio
from typing import cast

from graph.prompts.religion_prompts import religion_prompt
from graph.models.religion_models import ReligionsOutput
from graph.states.agent_state import AgentState

from tools.api_tool import save_religion
from tools.search_tool import search_religions

from lib.llm import llm

async def religion_node(state: AgentState) -> dict:
    entities = state['entities']
    search_results = await asyncio.gather(*[
        search_religions(entity['name'], entity['start_year'], entity['end_year']) for entity in entities
    ])
    errors = []
    updated_entities = []

    print(f"[religion_node] entities received: {len(entities)}")
    for entity, search_result in zip(entities, search_results):
        prompt = religion_prompt(entity['name'], entity['start_year'], entity['end_year'], search_result)
        structured_llm = llm.with_structured_output(ReligionsOutput)
        results: ReligionsOutput = cast(ReligionsOutput, await structured_llm.ainvoke(prompt))
        updated_entity = {**entity, "religions": []}
        
        for r in results.religions:
            response = await save_religion(entity['id'], r.religion, r.start_year, r.end_year)

            if isinstance(response, str):
                errors.append({"step": "religion_node", "error": response})
            else:
                updated_entity['religions'].append({
                    "religion": response['religion'],
                    "entity_id": entity['id'],
                    "start_year": response['start_year'],
                    "end_year": response['end_year']
                })


        updated_entities.append(updated_entity)
        
    return {
        "entities": updated_entities,
        "errors": errors
    }