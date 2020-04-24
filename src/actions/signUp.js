import {API_ROOT, headers} from '../services/api'

const signUp = (event, userInput, history) => {
  event.preventDefault()
  return (dispatch) => {
    return fetch(`${API_ROOT}/users`, {
      method: "POST",
      headers: headers, 
      body: JSON.stringify({
        username: userInput.username,
        email: userInput.email,
        password: userInput.password
      })})
      .then(response => response.json())
      .then(json => { 
        if(json.errors) {
          console.log(json.errors)
          dispatch({ type: "SET_ERROR", messages: json.errors })
        }
        else {
          dispatch({ type: "SET_CURRENT_USER", user: json.user })
          dispatch({type: "SET_BOOKMARKS", bookmarks: json.user.bookmarks})
          localStorage.setItem('token', json.token)
          history.push('/profile')
        }
      })
    }
}

export default signUp