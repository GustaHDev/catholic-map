import asyncio

from graph.states.agent_state import AgentState

from tools.geojson_tool import geojson_tool
from tools.api_tool import search_territory_by_country_code


async def boundaries_node(state: AgentState) -> dict:
    entities = state['entities']
    errors = []
    updated_entities = []

    print(f"[boundaries_node] entities received: {len(entities)}")
    for entity in entities:
        territories = entity['territories']
        if not territories:
            errors.append({"step": "boundaries_node", "errors": f"territories for {entity['name']} cannot be null"})
            continue

        results: list[dict] = await asyncio.gather(*[
            search_territory_by_country_code(t['country_code'])
            for t in territories
        ])


        new_territories = []
        for r, territory in zip(results, territories):

            geojson_data = geojson_tool(r['country_code'])

            new_territories.append({
                "name": territory['name'],
                "entity_id": entity['id'],
                "territory_id": r['id'],
                "country_code": territory['country_code'],
                "continent": r['continent'],
                "start_year": territory['start_year'],
                "end_year": territory['end_year'],
                "percentage_controlled": territory['percentage_controlled'],
                "geojson_boundary": geojson_data
        })
            
        updated_entity = {**entity, "territories": new_territories}
        updated_entities.append(updated_entity)

    return {
        "entities": updated_entities,
        "errors": errors
    }
