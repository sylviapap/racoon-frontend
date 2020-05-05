import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import NavBar from './NavBar'
import {API_ROOT} from '../services/api'
import addSymptom from '../actions/addSymptom'
import deleteSymptom from '../actions/deleteSymptom'

class MedicalProfile extends Component {
  state = {
    symptomChoices: [],
    symptomsToAdd: []
  }

  componentDidMount() {
    fetch(`${API_ROOT}/symptoms`)
      .then(resp => resp.json())
      .then(json => this.setState({symptomChoices: json}))
  }

  handleSelect = (event) => {
    const options = event.target.options;
    const values = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    this.setState({[event.target.name]: values});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let userId = this.props.currentUser.id
    this.state.symptomsToAdd.map(s => this.props.addSymptom(event, userId, s, this.props.history))
  }

  deleteSymptom = (id) => {
    this.props.deleteSymptom(id)
  }

  render() {
    let first = this.props.currentUser.first_name
    let last = this.props.currentUser.last_name
    let titleFirstName = first.charAt(0).toUpperCase() + first.substr(1).toLowerCase()
    let titleLastName = last.charAt(0).toUpperCase() + last.substr(1).toLowerCase()
    console.log(this.props)
    return(
      <Fragment>
      <NavBar />
    <div className="profile page">
      <h1 className="welcome">My Info</h1>
      <div className="medical-info">
        <p>Medical Information For: {titleFirstName} {titleLastName}</p>
        <p>Saved Diagnoses:</p><ul>{this.props.currentUser.diagnoses.map(d => <li>{d.description}</li>)}</ul>
        <p>Saved Symptoms:</p><ul>{this.props.reportedSymptoms.map(s => <li>{s.symptom.common_name}<button onClick={() => this.deleteSymptom(s.id)}>Delete</button></li>)}</ul>
      </div>
      <form onSubmit ={this.handleSubmit}className="post-form">
        <label>Save symptoms to your information: (Hold Ctrl or Cmd to select multiple)</label>
          <select 
            multiple={true} 
            value={this.state.symptomsToAdd} 
            name="symptomsToAdd"
            onChange={this.handleSelect} >
              {this.state.symptomChoices.map(symptom => 
                <option 
                  value={symptom.id} 
                  key={symptom.id}>
                    {symptom.common_name}
                </option>)}
          </select>
        <input className="symptom-submit" type="submit" value="Submit"/>
      </form>

    </div>
    </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    reportedSymptoms: state.user.reportedSymptoms
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addSymptom: (event, userId, symptomId, history) => {dispatch(addSymptom(event, userId, symptomId, history))},
    deleteSymptom: (id) => {dispatch(deleteSymptom(id))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalProfile)