import {API_ROOT, authHeaders} from '../services/api'

const addSymptom = (event, userId, symptomId, history) => {
  return (dispatch) => {
    return fetch(`${API_ROOT}/reported_symptoms`, {
      method: "POST", 
      headers: authHeaders,
      body: JSON.stringify({
        user_id: userId,
        symptom_id: symptomId
      })
    })
    .then(response => response.json())
    .catch(error => {
			if (error) {
				console.log(error);
				dispatch({ type: "SET_ERROR", messages: [error] })
			}
			else {
				return window.alert("addSymptom error")
			}
		})
    .then(json => {
      console.log(json);
      dispatch({ type: "ADD_SYMPTOM", symptom: json.symptom })
      history.push('/medical')
    })
  }
}

export default addSymptom