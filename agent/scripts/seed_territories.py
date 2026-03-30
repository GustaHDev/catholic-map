import asyncio
import json
import os

from tools.api_tool import save_territory

async def seed_territories():
    print("[seed territories] called function seed_territories")
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(BASE_DIR, "../data/countries.geojson")

    with open(path) as f:
        geojson_data = json.load(f)

    print("[seed territories] loaded geojson_data")
    countries = []

    for feature in geojson_data["features"]:
        geojson_index = {
            "name": feature["properties"]["name"],
            "country_code": feature["properties"]["ISO3166-1-Alpha-3"]
        }
        print(f"[seed territories] finded country {feature["properties"]["name"]} with country code {feature["properties"]["ISO3166-1-Alpha-3"]}")

        countries.append(geojson_index)

    await asyncio.gather(*[
        save_territory(c['name'], c['country_code'], None)
        for c in countries
    ])

    print(f"[seed territories] finished process. {len(countries)} saved in the database")

if __name__ == "__main__":
    asyncio.run(seed_territories())