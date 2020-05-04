import React, {Component} from 'react';
import { connect } from 'react-redux';
// import {API_ROOT, authHeaders} from '../services/api'

class Results extends Component{

  handleClick = () => {
    // fetch(`${API_ROOT}/reported_symptoms`, {
    //   method: "POST", 
    //   headers: authHeaders,
    //   body: JSON.stringify({
    //     user_id: this.props.currentUser.id,
    //     symptom_id: symptomId
    //   })
    // })
    //   .then(response => response.json())
    //   .then(json => {console.log(json)
    //   })
    // symptomId = s_1 or p_1 etc 
    console.log("clicked")
  }

  render() {
    return(
      <div className="results">
        
        <header className="results">Preliminary Diagnosis</header>
        {!!this.props.response.description ? 
        <div classname="infermedica-description">
        <p>{this.props.response.description}</p>
        <p>{this.props.response.label}</p>
        </div>
        :
        null}
        
        {this.props.response.serious.map(a => 
        <div className="result-item" key={a.id}>
          <p>{a.common_name}</p>
        </div>
        )}
        <button onClick={() => this.handleClick()}>Save Diagnosis</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
		currentUser: state.user.currentUser
	}
}

export default connect(mapStateToProps)(Results)