from typing import Optional, TypedDict


class TerritoryState(TypedDict):
    name: str
    entity_id: Optional[str]
    territory_id: Optional[str]
    country_code: str
    continent: str
    start_year: Optional[int]
    end_year: Optional[int]
    percentage_controlled: Optional[float]
    geojson_boundary: Optional[dict]