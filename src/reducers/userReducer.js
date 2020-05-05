const intitialState = {
  currentUser: {},
  bookmarks: [],
  createdMarkers: [],
  symptoms: []
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

    case "SET_SYMPTOMS":
      return {
        ...state, 
        symptoms: action.symptoms
      }

    case "ADD_BOOKMARK":
      let filter = state.bookmarks.filter(b => b.id === action.newBookmark.id)
      console.log(filter.length)
      if (filter.length) {
        return state
      }
      else {
        return {
          ...state,
          bookmarks: [...state.bookmarks, action.newBookmark]
        }
      }

    case "ADD_CREATED_MARKER":
      return {
        ...state,
        createdMarkers: [...state.createdMarkers, action.marker]
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

    case "ADD_SYMPTOM":
      return {
        ...state,
        symptoms: [...state.symptoms, action.symptom]
      }

    default:
      return state;
  }
}

export default userReducer;