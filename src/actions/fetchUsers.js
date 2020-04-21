export const fetchUsers = () => {
    return (dispatch) => {
      fetch('http://localhost:3001/api/v1/users')
      .then(resp => resp.json())
      .then(json => {
        dispatch({ type: 'ADD_USERS', users: json })
      })
    }
  }