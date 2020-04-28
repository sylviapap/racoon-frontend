import {API_ROOT, authHeaders} from '../services/api'

const deleteBookmark = (id) => {
  return (dispatch) => {
    return fetch(`${API_ROOT}/bookmarks/${id}`, {
      method: "DELETE",
      headers: authHeaders
    })
    .then(dispatch({ type: "DELETE_BOOKMARK", id: id}))
  }
}

export default deleteBookmark