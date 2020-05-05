const fetchOfficialMap = () => {
  return (dispatch) => {
    fetch(`https://covid19-api.com/country/all`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispatch({ type: "OFFICIAL_MAP", officialMap: json})
      })    
  }
}

export default fetchOfficialMap