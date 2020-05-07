import React, {Component} from 'react';
import { connect } from 'react-redux';
import addDiagnosis from '../actions/addDiagnosis'

class Results extends Component{

  handleSaveClick = () => {
    console.log(this.props)
    const data = {
      user_id: this.props.currentUser.id,
      description: this.props.response.description,
      label: this.props.response.label,
      triage_level: this.props.response.triage_level
    }
    this.props.addDiagnosis(data, this.props.history)
  }

  render() {
    return(
      <div className="results">
        <header className="results">Preliminary Diagnosis</header>
        {!!this.props.response.description ? 
        <div className="infermedica-description">
        <p>{this.props.response.description}</p>
        <p>Recommendation: {this.props.response.label}</p>
        <p>The following symptoms are especially serious:</p>
        </div>
        :
        <p>Not enough information given for a formal diagnosis. However, the following reported symptoms are serious and you should seek medical attention if they persist:</p>}
        
        {this.props.response.serious.map(a => 
        <div className="result-item" key={a.id}>
          <p>{a.common_name}</p>
          {a.is_emergency ? <span className="emergency">Emergency symptom</span> : null}
        </div>
        )}

        {!!this.props.currentUser ? (<button onClick={this.handleSaveClick}>Save Diagnosis</button>)
        :
        (<p><a className="results" href="/login">Log In</a> to save this diagnosis</p>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    diagnoses: state.medical.diagnoses
	}
}

const mapDispatchToProps = (dispatch) => {
  return{
    addDiagnosis: (data, history) => {dispatch(addDiagnosis(data, history))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)