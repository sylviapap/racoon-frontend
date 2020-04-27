const intitialState = {
  loading: false
}

const loadingReducer = (state = intitialState, action) => {
  switch(action.type) {
    case "LOADING":
      return {
        ...state, 
        loading: true
      }
        
    default: 
      return state;
  }
}

export default loadingReducer;