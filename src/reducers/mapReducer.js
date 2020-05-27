const intitialState = {
  myMap: [{
    address: "",
    comments: [],
    created_at: "",
    creator: {symptoms: []},
    id: 1,
    latitude: 0,
    longitude: 0,
    message: "",
    title: "Loading..."
  }],
  officialMap: []
}

const mapReducer = (state = intitialState, action) => {
  switch(action.type) {
    case "GET_MY_MAP":
      return {
        ...state, 
        myMap: action.myMap
      }

    case "OFFICIAL_MAP":
      return {
        ...state, 
        officialMap: action.officialMap
      }

    case "ADD_TO_MAP":
      return {
        ...state,
        myMap: [...state.myMap, action.marker]
      }

    case "DELETE_FROM_MAP":
      const myMap = state.myMap.filter(marker => marker.id !== action.id)
      return {
        ...state,
        myMap
      }
      
    default:
      return state;
  }
}

export default mapReducer;