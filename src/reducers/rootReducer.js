const intitialState = {
  mapFilters: {},
  users: []
}

const rootReducer = (state = intitialState, action) => {
  switch(action.type) {
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

    default:
      return state;
  }
}

export default rootReducer;