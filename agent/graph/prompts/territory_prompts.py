def territory_prompt(entity_name: str, start_year: int, end_year: int, search_results: str) -> str:
    return f"""
                Based on the following search results about the historical entity {entity_name},
                extract all the modern territories that entity had during its existence (between {start_year} and {end_year}).

                Search results:
                {search_results}

                For each modern territory provide:
                    - territory_id
                    - start_year (year in which the entity annexed the territory)
                    - end_year (year in which the entity lost the territory)
                    - percentage_controlled (how much of the modern territory the entity had under its control)
                    - geojson_boundary
            """