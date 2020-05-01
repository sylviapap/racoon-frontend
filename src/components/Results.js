import React, {Component} from 'react';
import { connect } from 'react-redux';
// import {API_ROOT, authHeaders} from '../services/api'

class Results extends Component{

  handleClick = (symptomId) => {
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
    console.log(symptomId, "clicked")
  }

  render() {
    console.log(this.props)
    return(
      <div className="results">Serious concerns: {this.props.response.serious.map(a => 
        <div className="result-item" key={a.id}>
          <p>{a.common_name}</p>
          <button onClick={() => this.handleClick(a.id)}>Save</button>
        </div>
        )}
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