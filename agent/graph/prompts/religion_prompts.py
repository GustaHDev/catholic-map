def religion_prompt(entity_name: str, start_year: int, end_year: int, search_results: str) -> str:
    return f"""
                Based on the following search results about the historical entity {entity_name},
                extract all the religions that entity had during its existence (between {start_year} and {end_year}).

                Search results:
                {search_results}

                For each religion provide:
                    - religion (name)
                    - start_year (year in which the entity assumed the religion)
                    - end_year (year in which the entity changed its religion)
            """