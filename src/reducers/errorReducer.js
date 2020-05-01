const intitialState = {
  error: false,
  messages: []
}

const errorReducer = (state = intitialState, action) => {
  switch(action.type) {
    case "SET_ERROR":
      return {
        ...state,
        error: true,
        messages: action.messages
      }

    case "NO_ERROR":
      return {
        ...state,
        error: false,
        messages: []
      }
        
    default: 
      return state;
  }
}

export default errorReducer;