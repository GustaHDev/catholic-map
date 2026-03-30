import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
path = os.path.join(BASE_DIR, "../data/countries.geojson")

with open(path) as f:
    geojson_data = json.load(f)

def geojson_tool(country_code: str) -> dict:
    """
        search in the internal data for boundaries of a country by its country_code.

        Args:
            country_code: Code of country to search using the standard ISO-3166-1 alpha-3
        
        Returns:
            A dictionary with all boundary data for that specific country
    """
    geojson_index = {
        feature["properties"]["ISO3166-1-Alpha-3"]: feature
        for feature in geojson_data["features"]
    }
    return geojson_index.get(country_code, {"Error": f"country with country code {country_code} not found"})