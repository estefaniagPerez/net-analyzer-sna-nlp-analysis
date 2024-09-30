from abc import ABC, abstractmethod
from .nlp_hatespeech import analyze_hatespeech
import os

file_directory = os.path.join(os.path.dirname(__file__), "resources")

# Define an interface-like class
class AnalysisNLP(ABC):

    @abstractmethod
    def analyze_msg(self, msg,):
        pass

class AnalysisNone(AnalysisNLP):
    
    def analyze_msg(self, msg,):
        return None

class AnalysisHateSpeech(AnalysisNLP):
    
    def analyze_msg(self, msg,):
        return analyze_hatespeech(msg)


def AnalysisFactory(type):
    if type == 'hate_speech':
        return AnalysisHateSpeech()
    else:
        return AnalysisNone()