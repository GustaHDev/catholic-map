from langgraph.graph import StateGraph
from graph.nodes.entity_node import entity_node
from graph.nodes.religion_node import religion_node
from graph.nodes.territory_node import territory_node
from graph.nodes.boundaries_node import boundaries_node
from graph.nodes.entities_territories_node import entities_territories_node
from graph.nodes.result_node import result_node
from graph.states.agent_state import AgentState


graph = StateGraph(AgentState)

graph.add_node("entity_node", entity_node)
graph.add_node("religion_node", religion_node)
graph.add_node("territory_node", territory_node)
graph.add_node("boundaries_node", boundaries_node)
graph.add_node("entities_territories_node", entities_territories_node)
graph.add_node("result_node", result_node)

graph.add_edge("entity_node", "religion_node")
graph.add_edge("religion_node", "territory_node")
graph.add_edge("territory_node", "boundaries_node")
graph.add_edge("boundaries_node", "entities_territories_node")
graph.add_edge("entities_territories_node", "result_node")

graph.set_entry_point("entity_node")
graph.set_finish_point("result_node")

app = graph.compile()