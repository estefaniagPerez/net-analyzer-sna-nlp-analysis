from abc import ABC, abstractmethod
from .sna_networkx import analyze_graph as networkx_analyze

# Define an interface-like class
class AnalysisSNA(ABC):

    @abstractmethod
    def analyze_graph(self, model, ):
        pass


# Concrete class that implements the interface
class AnalysisNetworkX(AnalysisSNA): 
    def analyze_graph(self, model):
        return networkx_analyze(model)


def AnalysisFactory(type):
    return AnalysisNetworkX()

