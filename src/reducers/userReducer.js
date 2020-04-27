const intitialState = {
  currentUser: {},
  bookmarks: [],
  createdMarkers: []
}

const userReducer = (state = intitialState, action) => {
  switch(action.type){
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

    case "CLEAR_CURRENT_USER":
      return {
        ...state, 
        currentUser: {}
      }

    default:
      return state;
  }
}

export default userReducer;