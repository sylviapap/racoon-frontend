import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import NavBar from './NavBar'
import addSymptom from '../actions/addSymptom'
import deleteSymptom from '../actions/deleteSymptom'

class MedicalProfile extends Component {
  state = {
    symptomsToAdd: []
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
    this.state.symptomsToAdd.map(s => this.props.addSymptom(event, userId, s))
    this.props.history.push('/medical')
  }

  deleteSymptom = (id) => {
    this.props.deleteSymptom(id)
  }

  render() {
    let first = this.props.currentUser.first_name
    let last = this.props.currentUser.last_name
    let titleFirstName = first.charAt(0).toUpperCase() + first.substr(1).toLowerCase()
    let titleLastName = last.charAt(0).toUpperCase() + last.substr(1).toLowerCase()
    return(
      <Fragment>
      <NavBar />
      <div className="medical-profile">
      <header className="welcome"><h1 className="welcome">My Health Profile</h1></header>
      <div className="medical-info">
        <h2>Name: {titleFirstName} {titleLastName}</h2>
        <div className="medical-card card">
        <span className="saved">Saved Diagnoses:</span><ul>{this.props.diagnoses.map(d => <div key={d.id}><li className="symptoms">{d.description ? d.description : `Inconclusive`}</li><span className="info">{new Date(d.created_at).toLocaleString()}</span></div>)}</ul>
        <span className="saved">Saved Symptoms:</span><ul>{this.props.reportedSymptoms.map(s => <li key={s.id} className="symptoms">{s.symptom.name}<button onClick={() => this.deleteSymptom(s.id)} className="symptoms-delete"><i className="fa fa-trash"></i>Delete</button></li>)}</ul>
      </div></div>
      <form onSubmit ={this.handleSubmit}className="post-form">
        <label>Add symptoms to your information: (Hold Ctrl or Cmd to select multiple)</label>
          <select 
            multiple={true} 
            value={this.state.symptomsToAdd} 
            name="symptomsToAdd"
            onChange={this.handleSelect} >
              {this.props.symptomChoices.map(symptom => 
                <option 
                  value={symptom.id} 
                  key={symptom.id}>
                    {symptom.name}
                </option>)}
          </select>
        <input className="symptom-submit" type="submit" value="Submit"/>
      </form>
      <a href="/audio" className="record btn">Record Audio</a>
      </div>
    </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    reportedSymptoms: state.medical.reportedSymptoms,
    diagnoses: state.medical.diagnoses,
    symptomChoices: state.medical.symptomChoices
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addSymptom: (event, userId, symptomId) => {dispatch(addSymptom(event, userId, symptomId))},
    deleteSymptom: (id) => {dispatch(deleteSymptom(id))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalProfile)