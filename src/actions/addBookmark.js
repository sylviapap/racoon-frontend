import {API_ROOT, authHeaders} from '../services/api'

const addBookmark = (event, markerData, history) => {
   
  return (dispatch) => {
     
    return fetch(`${API_ROOT}/bookmarks`, {
      method: "POST", 
      headers: authHeaders,
      body: JSON.stringify(markerData)
    })
    .then(response => response.json())
    .then(json => { 
      if(json.error || json.message) {
        console.log("error", json)
      } else {
        dispatch({type: "ADD_BOOKMARK", newBookmark: json})
        history.push('/map/my-markers')
      }
    })
  }
}

export default addBookmark