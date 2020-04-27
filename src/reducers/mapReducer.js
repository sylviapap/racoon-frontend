const intitialState = {
  initialMap: []
}

const mapReducer = (state = intitialState, action) => {
  switch(action.type) {
    case "GET_MAP":
      return {
        ...state, 
        initialMap: action.initialMap
      }
      
    default:
      return state;
  }
}

export default mapReducer;