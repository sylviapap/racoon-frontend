import {API_ROOT} from '../services/api'

export const fetchUsers = () => {
    return (dispatch) => {
      fetch(`${API_ROOT}/users`)
      .then(resp => resp.json())
      .then(json => {
        dispatch({ type: 'GET_USERS', users: json })
      })
    }
  }