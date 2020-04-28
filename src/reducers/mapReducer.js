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

    case "DELETE_FROM_MAP":
      const initialMap = state.initialMap.filter(marker => marker.id !== action.id)
      console.log(initialMap)
      return {
        ...state,
        initialMap
      }
      
    default:
      return state;
  }
}

export default mapReducer;