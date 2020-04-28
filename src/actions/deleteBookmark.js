import {API_ROOT} from '../services/api'

const deleteBookmark = (id) => {
  return (dispatch) => {
    return fetch(`${API_ROOT}/bookmarks/${id}`, {
      method: "DELETE"
    })
    .then(dispatch({ type: "DELETE_BOOKMARK", id: id}))
  }
}

export default deleteBookmark