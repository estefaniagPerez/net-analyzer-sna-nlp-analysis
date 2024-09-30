from pymongo import MongoClient
from .mongo_connect import get_hatespeech_collection as get_collection
from ..models.error_status import error_usermsg as err

def get_user_msgs_hs(user_id):
    try:
        results = None
        status = err['E_UNKNOWN']
        [collection, status] = get_collection()
        if collection != None or status != err['E_SUCCESS']:
            results = collection.find_one({'user_id': user_id})
        return [results, status]
    except Exception as e:
        return [None, status]
        
def get_users_msgs(type, user_id):
    if(type == "hate_speech"):
         return get_user_msgs_hs(user_id)
    else:
        return [None, err['E_WRONG_MODEL']]