from ..schemas.users_msg import get_users_msgs
from ..models.error_status import error_usermsg as err
from ..analyzers.analysis_nlp import nlp_analysis as nlp
from ..models import risk_matrix as matrix
import logging
logger = logging.getLogger(__name__)

def calculat_frequency(user_id, type_model):
    try:

        [user_data, status] = get_users_msgs(type_model, user_id)
        logger.info(f'RISK CALCULATION | Data From User in Mongo {user_data}')
        percent = -1
        if status == err['E_SUCCESS']:
            if 'msgs' in user_data:
                analyzer = nlp.AnalysisFactory(type_model)
                total = len(user_data['msgs'])
                are_hate = analyzer.analyze_msg(user_data['msgs'])
                total_hate = sum(x for x in are_hate)
                percent = total_hate * 100 / total
        return percent

    except Exception as e:
        logger.error(f"Unexpected error in frequency calculation: {e}")
        return -1
        
def calculate_risk(freq, user_type):
    try:

        if not user_type in matrix.risk_utype:
            return -1
        
        if matrix.in_range(freq, matrix.risk_freq['HIGH']):
            return matrix.risk_m['HIGH'][user_type]
        elif matrix.in_range(freq, matrix.risk_freq['MEDIUM']):
            return matrix.risk_m['MEDIUM'][user_type]
        elif matrix.in_range(freq, matrix.risk_freq['LOW']):
            return matrix.risk_m['LOW'][user_type]
        else:
            return -1
        
    except Exception as e:
        logger.error(f"Unexpected error in risk calculation: {e}")
        return -1

def calculate_risk_on_chains(user_id, model_chain, user_type):
    try:

        risk = []
        for model in model_chain:
            freq = calculat_frequency(user_id, model)
            if freq == -1:
                risk.append({'risk': -1, 'freq': -1})    
            current_risk = calculate_risk(freq, user_type)
            risk.append({'risk': current_risk, 'freq': freq})
        return risk
    
    except Exception as e:
        logger.error(f"Unexpected error in chain risk calculation: {e}")
        return [{'risk': -1, 'freq': -1}]

def calculate_combined_risk(risk, chain, user_type):
    try:

        if risk == None or len(risk) == 0:
            return {'risk': -1, 'freq': -1, 'user_type': 'UNKNOWN'}
        
        if len(chain) == 1:
            risk[0]['user_type'] = user_type
            risk[0]['risk_name'] = matrix.risk_name(risk[0]['risk'])
            return risk[0]
        else:   # For multiple model chain will depend on the chain
            return {'risk': -1, 'freq': -1, 'user_type': user_type}
        
    except Exception as e:
        logger.error(f"Error in combined risk calculation: {e}")
        return {'risk': -1, 'freq': -1, 'user_type': 'UNKNOWN'}

def caluclate_risk_hatespeech(user_id, is_influencer, is_bridge):
    chain = ['hate_speech']
    try:

        logger.info(f'RISK CALCULATION | Starting process, user id is {user_id}')
        user_type = matrix.get_user_type(is_influencer, is_bridge)
        logger.info(f'RISK CALCULATION | User Type is {user_type}')
        if user_type == 'UNKNOWN':
            return {'risk': -1, 'freq': -1, 'user_type': 'UNKNOWN'}
        
        risk = calculate_risk_on_chains(user_id, chain, user_type)
        final_risk = calculate_combined_risk(risk, chain, user_type)
        return final_risk
    
    except Exception as e:
        logger.error(f"Unexpected error during hatespeech risk calculation: {e}")
        return {'risk': -1, 'freq': -1, 'user_type': 'UNKNOWN'}


    