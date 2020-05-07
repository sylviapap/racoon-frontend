const intitialState = {
  symptomChoices: []
}

const medicalReducer = (state = intitialState, action) => {
  switch(action.type){
    case "GET_SYMPTOMS":
      return {
        ...state, 
        symptomChoices: action.symptomChoices
      }

    default:
      return state;
    }
  }
  
export default medicalReducer;