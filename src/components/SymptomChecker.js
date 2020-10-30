import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar'
import Results from './Results'
import SymptomForm from './SymptomForm'
import doctor from '../images/doctor.png'

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
      this.setState({response: json})
    })
  }

  render() {
    return(
      <Fragment>
      <NavBar />
      <header className="checker"><h1 className="checker">Symptom Checker</h1></header>
      <div className="symptom-checker" ref={el => (this.div = el)}>
        
        <img src={doctor} className="doctor" alt="doctor" />

        {!this.props.currentUser.id ? 
        (<p className="symptoms-warning">Must be <a className="results" href="/login">Logged In</a> to save results</p>)
        :
        null}

        {!!this.state.response.serious || this.state.response.description ? 
          <Results response={this.state.response} history={this.props.history}/>
          : 
          <div className="checker-main">
          <SymptomForm handleSubmit={this.handleSubmit} />
          </div>
        }
        
        {!!this.state.response.message ?
        <p className="symptoms-warning">Error: Not enough information. Please make sure you have selected your sex, age as a whole number, and enough symptoms/risk factors</p>
        :
        null}

        <p className="disclaimer">*Results are not meant to replace professional medical advice</p>
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