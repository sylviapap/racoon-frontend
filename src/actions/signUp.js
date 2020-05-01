import {API_ROOT, headers} from '../services/api'

const signUp = (event, userInput, history) => {
  event.preventDefault()
  return (dispatch) => {
    return fetch(`${API_ROOT}/users`, {
      method: "POST",
      headers: headers, 
      body: JSON.stringify({
        first_name: userInput.firstname,
        last_name: userInput.lastname,
        email: userInput.email,
        password: userInput.password,
        password_confirmation: userInput.password_confirmation
      })})
      .then(response => response.json())
      .then(json => { 
        if(json.errors) {
          console.log(json.errors)
          dispatch({ type: "SET_ERROR", messages: json.errors })
        }
        else {
          dispatch({ type: "SET_CURRENT_USER", user: json.user })
          localStorage.setItem('token', json.token);
          history.push('/profile')
        }
      })
    }
}

export default signUp