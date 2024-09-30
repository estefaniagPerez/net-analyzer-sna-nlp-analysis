import axios from 'axios';

axios.defaults.baseURL = "http://" + location.host ;

export function getUserRisk(chain, user_id, is_influencer, is_bridge) {
    // Fetch graph data from the backend API
    return axios.get('api/users_risks/' + chain + '/' + user_id, {
        params: {is_influencer: is_influencer, is_bridge: is_bridge}})
    .then(response => {
        const result = response.data;
        if (!result) {
            console.log('Error fetching graph data: User Risk');
            return {'status': -2};
        }
        return result;
    })
    .catch(error => {
        console.error('Error fetching graph data: User Risk', error);
        return {'status': -3};
    });
    
}
