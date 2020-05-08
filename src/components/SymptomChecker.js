import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar'
import Results from './Results'
import SymptomForm from './SymptomForm'

import doctor from '../doctor.png'

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
    console.log(!!this.props.currentUser.id)
    return(
      <Fragment>
      <NavBar />
      <header className="checker"><h1 className="checker">Symptom Checker</h1></header>
      <div className="symptom-checker">
        <img src={doctor} className="doctor" />

        {!this.props.currentUser.id ? 
        (<p className="symptoms-warning"><a className="results" href="/login">Log In</a> now or your results will not be saved!</p>)
        :
        null}

        {!!this.state.response.serious || this.state.response.description ? 
          <Results response={this.state.response} history={this.props.history}/>
          : 
          <div><span className="checker info">Please enter your sex, age, if you have a fever, and at least one other symptom. Results might not give a formal diagnosis if not enough information is given.</span>
          <SymptomForm handleSubmit={this.handleSubmit} /></div>
        }
        
        {!!this.state.response.message ?
        <p className="symptoms-warning">Error: Not enough information. Please make sure you have selected your sex, age as a whole number, and enough symptoms/risk factors {console.log(this.state.response.message)}</p>
        :
        null}


        <p className="disclaimer">*Results are not meant to replace professional medical advice. Credit: Infermedica API</p>
      </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser	
  }
}

export default connect(mapStateToProps)(SymptomChecker)