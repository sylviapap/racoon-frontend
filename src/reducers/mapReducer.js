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

    case "ADD_TO_MAP":
      return {
        ...state,
        initialMap: [...state.initialMap, action.marker]
      }
      
    default:
      return state;
  }
}

export default mapReducer;