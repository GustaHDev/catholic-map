import asyncio

from graph.states.agent_state import AgentState

from tools.api_tool import assign_territory_entity


async def entities_territories_node(state: AgentState) -> dict:
    entities = state['entities']
    errors = []
    updated_entities = []

    print(f"entities received: {len(entities)}")
    for entity in entities:
        print(f"entity: {entity['name']}, territories: {entity['territories']}")
        territories = entity['territories']
        if not territories:
            errors.append({"step": "entities_territories_node", "error": f"territories for {entity['name']} cannot be null"})
            continue
        try:
            response: list[dict] = await asyncio.gather(*[
                                assign_territory_entity(entity['id'], t['territory_id'], t['start_year'], t['end_year'], t['percentage_controlled'], t['geojson_boundary'])
                                for t in territories
                            ])
        
            updated_entity = {**entity, "territories": response}
            updated_entities.append(updated_entity)
        except Exception as e:
            errors.append({"step": "entities_territories_node", "error": str(e)})

    print(f"updated_entities count: {len(updated_entities)}")
    print(f"errors: {errors}")

    return {
        "entities": updated_entities,
        "errors": errors
    }