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

    case "ADD_BOOKMARK":
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.newBookmark]
      }

    case "DELETE_BOOKMARK":
      const bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== action.id)
      return {
        ...state,
        bookmarks
      }

    case "DELETE_CREATED_MARKER":
      const createdMarkers = state.createdMarkers.filter(marker => marker.id !== action.id)
      return {
        ...state,
        createdMarkers
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