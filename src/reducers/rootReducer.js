const rootReducer = (state = { users: [], loading: false }, action) => {
    switch(action.type) {
      case 'ADD_USERS':
        return {
          ...state,
          users: action.users
        }
      default:
        return state;
    }
  }

export default rootReducer