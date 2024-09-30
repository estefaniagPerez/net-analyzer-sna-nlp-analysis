from pymongo import MongoClient
from ..models.error_status import error_usermsg as err
import os

# Docker Connection String
uri = os.getenv("MONGO_URI")

if not uri:
    # Host Machine Connection String
    uri = "mongodb://root:example@localhost:27017"

client = MongoClient(uri)

def get_connection():
    return client

def get_hatespeech_collection():
    try:
        if client == None: return [None, err['E_CONNECT_DB']]
        
        database = client["netanalyzer"]
        if database == None: return [None, err['E_WRONG_DB']]

        collection = database["hate_speech"]
        if collection == None: return [None, err['E_WRONG_COLLECTION']]

        return [collection, err['E_SUCCESS']]
    except Exception as e:
        return [None, err['E_CONNECT_DB']]