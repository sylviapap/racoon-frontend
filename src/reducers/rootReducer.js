const intitialState = {
  loading: false,
  currentUser: {},
  bookmarks: [],
  createdMarkers: []
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

    case "SET_BOOKMARKS":
      return {
        ...state, 
        bookmarks: action.bookmarks
      }

    case "SET_CREATED_MARKERS":
      return {
        ...state, 
        createdMarkers: action.createdMarkers
      }

    case "SET_ERROR":
      return {
        ...state,
        error: true,
        messages: action.messages
      }

    case "CLEAR_CURRENT_USER":
      return {...state, currentUser: {}}

    default:
      return state;
  }
}

export default rootReducer;