import React, {Component, Fragment} from 'react';
import NavBar from './NavBar'
import Results from './Results'
import SymptomForm from './SymptomForm'

const infermedicaHeaders = {
  "App-Id": process.env.REACT_APP_INFERMEDICA_APP_ID,
  "App-Key": process.env.REACT_APP_INFERMEDICA_APP_KEY,
  "Content-Type": "application/json"
}

class SymptomChecker extends Component {
  state = {
    response: {}
  }

  handleSubmit = (event, sex, age, evidence) => {
    event.preventDefault();
    fetch("https://api.infermedica.com/covid19/triage", {
      method: "POST",
      headers: infermedicaHeaders,
      body: JSON.stringify({
        "sex": sex,
        "age": parseInt(age),
        "evidence": evidence
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({response: json})
    })
  }

  render() {
    console.log(!!this.props.currentUser)
    return(
      <Fragment>
      <NavBar />
      <header className="checker"><h1>Symptom Checker</h1></header>
      <div className="symptom-checker">
        {!this.props.currentUser ? null
          :
        (<p><a className="results" href="/login">Log In</a> now or your results will not be saved!</p>)}

        {!!this.state.response.serious || this.state.response.description ? 
          <Results response={this.state.response} history={this.props.history}/>
          : 
          <SymptomForm handleSubmit={this.handleSubmit} />
        }
        
        {!!this.state.response.message ?
        <p>Error! Please make sure you have selected your sex, age as a whole number, and at least one symptom {console.log(this.state.response.message)}</p>
        :
        null}


        <p className="disclaimer">*Results are not meant to replace professional medical advice</p>
      </div>
      </Fragment>
    )
  }
}

export default SymptomChecker