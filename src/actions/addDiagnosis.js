import {API_ROOT, authHeaders} from '../services/api'

const addDiagnosis = (data, history) => {
  return (dispatch) => {
    return fetch(`${API_ROOT}/diagnoses`, {
      method: "POST", 
      headers: authHeaders,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
			if (error) {
				console.log(error);
				dispatch({ type: "SET_ERROR", messages: [error] })
			}
			else {
				return window.alert("addDiagnosis error")
			}
		})
    .then(json => {
      console.log(json);
      dispatch({ type: "ADD_DIAGNOSIS", newDiagnosis: json })
      history.push('/medical')
    })
  }
}

export default addDiagnosis