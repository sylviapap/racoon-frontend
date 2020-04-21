const intitialState = {
  initialMap: [],
  mapFilters: {},
  displayMap: null
}

const rootReducer = (state = intitialState, action) => {
  switch(action.type) {
    case 'ADD_USERS':
      return {
        ...state,
        users: action.users
      }

    case 'GET_MAP':
      return {
        ...state, 
        initialMap: action.initialMap
      }

    default:
      return state;
  }
}

export default rootReducer;