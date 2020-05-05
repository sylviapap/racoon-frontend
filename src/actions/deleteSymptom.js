import {API_ROOT, authHeaders} from '../services/api'

const deleteSymptom = (id) => {
  return (dispatch) => {
    return fetch(`${API_ROOT}/reported_symptoms/${id}`, {
      method: "DELETE",
      headers: authHeaders
    })
    .then(dispatch({ type: "DELETE_SYMPTOM", id: id}))
  }
}

export default deleteSymptom