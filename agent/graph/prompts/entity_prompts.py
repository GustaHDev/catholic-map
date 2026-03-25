def entity_prompt(year: int, search_results: str) -> str:
    return f"""
                Based on the following search results about historical entities in year {year},
                extract all major empires, kingdoms and states that existed at that time.

                Search results:
                {search_results}

                For each entity provide:
                    - name
                    - start_year (use negative numbers for BC)
                    - end_year
                    - color (a hex color code)
                    - ai_generated (false, since this is historical data)
            """