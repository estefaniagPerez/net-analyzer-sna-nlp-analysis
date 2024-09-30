risk_utype = {
    'NORMAL': 0,
    'BRIDGE': 1,
    'INFLUENCER': 2
}

risk_freq = {
    'LOW': {'min': 0, 'max': 44},
    'MEDIUM': {'min': 45, 'max': 64},
    'HIGH': {'min': 65, 'max': 100}
}

risk_level = {
    'LOW': 0,
    'MEDIUM': 1,
    'HIGH': 2
}

risk_level_es = {
    'BAJO': 0,
    'MEDIO': 1,
    'ALTO': 2
}

risk_m = {
    'HIGH': {
        'INFLUENCER': risk_level['HIGH'],
        'BRIDGE': risk_level['HIGH'],
        'NORMAL': risk_level['MEDIUM']
    },
    'MEDIUM': {
        'INFLUENCER': risk_level['HIGH'],
        'BRIDGE': risk_level['MEDIUM'],
        'NORMAL': risk_level['LOW']
    },
    'LOW': {
        'INFLUENCER': risk_level['MEDIUM'],
        'BRIDGE': risk_level['LOW'],
        'NORMAL': risk_level['LOW']
    }
}

type_node = [
    {'is_influencer': True, 'is_bridge': True, 'user_type': 'INFLUENCER'},
    {'is_influencer': True, 'is_bridge': False, 'user_type': 'INFLUENCER'},
    {'is_influencer': False, 'is_bridge': True, 'user_type': 'BRIDGE'},
    {'is_influencer': False, 'is_bridge': False, 'user_type': 'NORMAL'}
]

def get_user_type(is_influencer, is_bridge):
    filter_list = [x for x in type_node if x["is_influencer"] == is_influencer and  x["is_bridge"] == is_bridge ]
    if filter_list != None and len(filter_list) == 1:
        return filter_list[0]['user_type']
    else:
        return 'UNKNOWN'

def in_range(freq, risk_freq):
    return freq >= risk_freq['min'] and freq <= risk_freq['max']

def risk_name(risk_id):
    if risk_id in risk_level_es.values():
        return list(risk_level_es.keys())[risk_id]
    return '---'