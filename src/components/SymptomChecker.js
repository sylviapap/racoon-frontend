import React, {Component} from 'react';

const headers = {
  "App-Id": process.env.REACT_APP_INFERMEDICA_APP_ID,
  "App-Key": process.env.REACT_APP_INFERMEDICA_APP_KEY,
  "Model": "infermedica-en",
  "Content-Type": "application/json"
}

class SymptomChecker extends Component {
  state = {
    fields: {}
  }

  handleSubmit = () => {
    fetch("https://api.infermedica.com/covid19/diagnosis", {
      method: "POST",
      headers: headers,
      body: data
    })
    .then(response => response.json())
    .then(json => console.log(json))
  }

	

  render() {
    return(
      <form></form>
    )
  }
}

export default SymptomChecker