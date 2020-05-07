const intitialState = {
  symptomChoices: [],
  reportedSymptoms: [],
  diagnoses: []
}

const medicalReducer = (state = intitialState, action) => {
  switch(action.type){
    case "GET_SYMPTOM_CHOICES":
      return {
        ...state, 
        symptomChoices: action.symptomChoices
      }
    
    case "SET_SYMPTOMS":
      return {
        ...state, 
        reportedSymptoms: action.reportedSymptoms
      }

    case "DELETE_SYMPTOM":
      const reportedSymptoms = state.reportedSymptoms.filter(sym => sym.id !== action.id)
      return {
        ...state,
        reportedSymptoms
      }

    case "ADD_SYMPTOM":
      let symptomfilter = state.reportedSymptoms.filter(s => s.id === action.reportedSymptom.id)
      if (symptomfilter.length) {
        return state
      }
      else {
        return {
          ...state,
          reportedSymptoms: [...state.reportedSymptoms, action.reportedSymptom]
        }
      }

    case "SET_DIAGNOSES":
      return {
        ...state, 
        diagnoses: action.diagnoses
      }

    case "ADD_DIAGNOSIS":
      let diagnosisFilter = state.diagnoses.filter(d => d.id === action.newDiagnosis.id)
      console.log(diagnosisFilter.length)
      if (diagnosisFilter.length) {
        return state
      }
      else {
        return {
          ...state,
          diagnoses: [...state.diagnoses, action.newDiagnosis]
        }
      }

    default:
      return state;
    }
  }
  
export default medicalReducer;