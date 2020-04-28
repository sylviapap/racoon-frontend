import {API_ROOT, authHeaders} from '../services/api'

const deleteCreatedMarker = (id) => {
  return (dispatch) => {
    return fetch(`${API_ROOT}/map_markers/${id}`, {
      method: "DELETE",
      headers: authHeaders
    })
    .then(dispatch({ type: "DELETE_CREATED_MARKER", id: id}))
  }
}

export default deleteCreatedMarker