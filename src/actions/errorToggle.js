const errorToggle = () => {
   
  return (dispatch) => {
    dispatch({ type: "NO_ERROR" })
  }
}

export default errorToggle