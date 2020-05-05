import {API_ROOT, authHeaders} from '../services/api'

const logIn = (event, userInput, history) => {
    event.preventDefault()
    return (dispatch) => {
        return fetch(`${API_ROOT}/auth/`, {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify({
                user: {
                    email: userInput.email,
                    password: userInput.password
                }
            })
        })
        .then(response => response.json())
        .then(json => { 
            if(json.error){
                console.log(json.error)
                dispatch({ type: "SET_ERROR", messages: [json.error] })
            } 
			else {
                console.log(json);
                dispatch({ type: "SET_CURRENT_USER", user: json.user })
                dispatch({type: "SET_BOOKMARKS", bookmarks: json.user.bookmarks})
                dispatch({type: "SET_CREATED_MARKERS", createdMarkers: json.user.created_markers})
                dispatch({ type: "NO_ERROR" })
                localStorage.setItem('token', json.token);
                history.push('/map')
            }
        })
    }
}

export default logIn