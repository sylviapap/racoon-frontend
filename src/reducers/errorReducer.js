const intitialState = {
  error: false
}

const errorReducer = (state = intitialState, action) => {
  switch(action.type) {
    case "SET_ERROR":
      return {
        ...state,
        error: true,
        messages: action.messages
      }
        
    default: 
      return state;
  }
}

export default errorReducer;