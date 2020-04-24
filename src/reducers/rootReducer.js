const intitialState = {
  loading: false,
  users: [],
  currentUser: {}
}

const rootReducer = (state = intitialState, action) => {
  switch(action.type) {
    case "LOADING":
      return {
        ...state, 
        loading: true
      }

    case "GET_USERS":
      return {
        ...state,
        users: action.users
      }

    case "GET_MAP":
      return {
        ...state, 
        initialMap: action.initialMap
      }

    case "SET_CURRENT_USER":
      return {
        ...state, 
        currentUser: action.user
      }

    default:
      return state;
  }
}

export default rootReducer;