const fetchOfficialMap = () => {
  return (dispatch) => {
    fetch(`https://covid-api.com/api/reports`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "OFFICIAL_MAP", officialMap: json.data})
      })    
  }
}

export default fetchOfficialMap