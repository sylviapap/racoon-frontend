import {API_ROOT, authHeaders} from '../services/api'

const getCurrentUser = () => {
	return (dispatch) => {
		return fetch(`${API_ROOT}/current_user`, {
		headers: authHeaders
		})
		.then(res => res.json())
		.then(json => { 
			if (json.error) {
				console.log(json.error)
				dispatch({ type: "SET_ERROR", messages: json.error })
			} 
			else {
				dispatch({ type: "SET_CURRENT_USER", user: json.user })
			}
		})
	}
};

export default getCurrentUser