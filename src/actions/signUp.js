const login = (username, password) => {
    return fetch(`${API_ROOT}/auth/`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ user: {username: username, password: password} })
    }).then(res => res.json());
  };
  
const getCurrentUser = () => {
    return fetch(`${API_ROOT}/current_user`, {
      headers: authHeaders
    }).then(res => res.json())
  };
  
export default {
    auth: {
      login: login,
      getCurrentUser: getCurrentUser
    }
  };

const signUp = (event, userInput, history) => {
    event.preventDefault()
    
    return (dispatch) => {
       
        return fetch(`${API_ROOT}/users`, {
            method: "POST",
            headers: headers, 
            body: JSON.stringify({
                username: "usertest",
                password: "pw",
            })
        }).then(response => response.json())
            .then(json => { console.log(json);
                if(json.error){
                    let message = document.getElementById("signupOops")
                    message.innerText = json.error;
                    message.style.color = "red"
                    
                    
                } else {
                    dispatch({ type: "SET_CURRENT_USER", user: json.user.data.attributes })
                    dispatch({type: "SET_USER_EVENTS", userEvents: json.user.included.map(issue => issue.attributes)})
                    localStorage.setItem('jwt', json.jwt)
                    history.push('/profile')
                }
            })
    }
}

export default signUp