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
				dispatch({ type: "SET_CURRENT_USER", currentUser: json.user })
				dispatch({type: "SET_BOOKMARKS", bookmarks: json.user.bookmarks})
				dispatch({type: "SET_CREATED_MARKERS", createdMarkers: json.user.created_markers})
			}
		})
	}
};

export default getCurrentUser