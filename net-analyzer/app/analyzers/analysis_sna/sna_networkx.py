import networkx as nx
import pandas as pd
import os
from networkx.algorithms.community import girvan_newman
from networkx.algorithms import bridges
import logging

logger = logging.getLogger(__name__)
file_directory = os.path.join(os.path.dirname(__file__), "resources")
available = ['demo_hatespeech']

def analyze_graph(model_name):
    try:
        if not model_name in available:
            return None
        
        # 1. Load the graph
        file_path = os.path.join(file_directory, model_name + '.csv')
        df = pd.read_csv(file_path )
        Graphtype=nx.Graph() 
        G = nx.from_pandas_edgelist(df, source='Source', target='Target', edge_attr='Link', create_using=Graphtype)

        # 2. Calculate the influencers
        degree_centrality = nx.degree_centrality(G)

        # 3. Calculate the bridges
        bridges = get_bridges(G)

        # 4. Prepare influencers
        nodes = []
        for node in G.nodes():
            nodes.append({
                'id': node,
                'degree_centrality': degree_centrality[node],
                'is_bridge': node in bridges
            })

        # 5. Prepare bridges
        edges = []
        bridge_set = set(bridges)
        for source, target in G.edges():
            edges.append({
                'source': source,
                'target': target,
                #'is_bridge': (source, target) in bridge_set or (target, source) in bridge_set,
            })

        # Build Graph for front-end
        graph_data = {
            'nodes': nodes,
            'edges': edges
        }
        #graph_json = json.dumps(graph_data)

        return graph_data
    except Exception as e:
        logger.error(e)
    
    return None

def get_bridges(G):
    # 1. Detect communities using Girvan-Newman algorithm
    communities = girvan_newman(G)

    # Take the first level of communities (first split)
    first_community_level = next(communities)
    community_list = [list(c) for c in first_community_level]

    # Create a dictionary to map nodes to their community
    node_community_map = {}
    for i, community in enumerate(community_list):
        for node in community:
            node_community_map[node] = i

    # 2. Identify boundary nodes
    bridges_nodes = set()

    for node in G.nodes():
        neighbor_communities = set()  # To store communities of the neighbors
        for neighbor in G.neighbors(node):
            neighbor_communities.add(node_community_map[neighbor])
        
        # If the node's neighbors belong to more than one community, it's a boundary node
        if len(neighbor_communities) > 1:
            bridges_nodes.add(node)
    return list(bridges_nodes)