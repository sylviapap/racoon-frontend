import React, {Component} from 'react';
import { connect } from 'react-redux';
import addToMap from '../actions/addToMap'
import {API_ROOT} from '../services/api'
import addSymptom from '../actions/addSymptom'

class PostToMap extends Component{
  state = {
    fields: {
      latitude: [],
      longitude: [],
      title: [], 
      address: []
    },
    symptomChoices: [],
    symptomsToAdd: []
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.showPosition);
    fetch(`${API_ROOT}/symptoms`)
      .then(resp => resp.json())
      .then(json => this.setState({symptomChoices: json}))
  }

  showPosition = (position) => {
    this.setState(prevState => ({ 
      fields: {
        ...prevState.fields,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    }))
  }

  handleChange = (event) => {
    const newFields = { ...this.state.fields, [event.target.name]: event.target.value };
    this.setState({ fields: newFields });
    console.log(this.state.fields)
  };

  handleSubmit = (event) => {
    event.preventDefault()
    let userId = this.props.currentUser.id
    let markerData = {
      user_id: userId,
      latitude: this.state.fields.latitude,
      longitude: this.state.fields.longitude,
      title: this.state.fields.title, 
      address: this.state.fields.address    
    }
    this.props.addToMap(event, markerData, this.props.history);
    this.state.symptomsToAdd.map(s => this.props.addSymptom(event, userId, s, this.props.history))
    this.setState({ 
      fields: {
        latitude: [],
        longitude: [],
        title: [], 
        address: []
    }});
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

  render() {
    return(
      <div className="post-container page">
        <i className="fa fa-times-circle return" onClick={this.props.handleReturnClick}/>
        <span className="info">Please allow the browser to access your location and wait for coordinates to appear. You may select symptoms, which will then be saved to your profile, and all saved symptoms from your profile will be posted to your marker. You can add/remove symptoms separately in your profile, and changes will reflect in the updated marker.</span>
      <form onSubmit ={this.handleSubmit}className="post-form">
        <label>Caption (optional)</label>
        <input name="title" type="text" value={this.state.fields.title} onChange={this.handleChange}/>
        <label>Address (optional)</label>
        <input name="address" type="text" value={this.state.fields.address} onChange={this.handleChange}/>
        <label>Latitude</label>
        <input name="latitude" type="number" value={this.state.fields.latitude} onChange={this.handleChange}/>
        <label>Longitude</label>
        <input name="longitude" type="number" value={this.state.fields.longitude} onChange={this.handleChange}/>

        <label>Select your symptoms: (Hold Ctrl or Cmd to select multiple)</label>
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

        <input className="post" type="submit" value="POST"/>
      </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
		currentUser: state.user.currentUser
	}
}

const mapDispatchToProps = (dispatch) => {
  return{
    addSymptom: (event, userId, symptomId, history) => {dispatch(addSymptom(event, userId, symptomId, history))},
    addToMap: (event, markerData, history) => {dispatch(addToMap(event, markerData, history))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostToMap)