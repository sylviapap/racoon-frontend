import React, {Component} from 'react';
import { connect } from 'react-redux';
import addToMap from '../actions/addToMap'
import addSymptom from '../actions/addSymptom'

class PostToMap extends Component{
  state = {
    fields: {
      latitude: [],
      longitude: [],
      title: [], 
      message: ""
    },
    symptomsToAdd: []
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.showPosition);
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
  };

  handleSubmit = (event) => {
    event.preventDefault()
    let userId = this.props.currentUser.id
    let markerData = {
      user_id: userId,
      latitude: this.state.fields.latitude,
      longitude: this.state.fields.longitude,
      title: this.state.fields.title, 
      message: this.state.fields.message  
    }
    this.state.symptomsToAdd.map(s => this.props.addSymptom(event, userId, s, this.props.history))
    this.props.addToMap(event, markerData);
    this.props.history.push('/map/my-markers')
    this.setState({ 
      fields: {
        latitude: [],
        longitude: [],
        title: [], 
        message: ""
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
			  <header className="marker"><h1 className="post">Post To Map</h1></header>
        <span className="info">*Please allow the browser to access your location and wait for coordinates to appear. You may select symptoms, which will then be saved to your profile, and all saved symptoms from your profile will be posted to your marker. You can add/remove symptoms separately in your profile, and changes will reflect in the updated marker.</span>
        <span className="info">*All posts are anonymous.</span>
      <form onSubmit ={this.handleSubmit}className="post-form">
        <label>Title (optional)</label>
          <input name="title" type="text" value={this.state.fields.title} onChange={this.handleChange}/>
        <label>Message/caption (optional)</label>
          <input name="message" type="text" value={this.state.fields.message} onChange={this.handleChange}/>
        <label>Latitude</label>
          <input name="latitude" type="number" value={this.state.fields.latitude} onChange={this.handleChange}/>
        <label>Longitude</label>
          <input name="longitude" type="number" value={this.state.fields.longitude} onChange={this.handleChange}/>

        <label>Any symptoms saved to your health profile will appear on your post, but you can select additional ones here:</label>
            <select 
              multiple={true} 
              value={this.state.symptomsToAdd} 
              name="symptomsToAdd"
              onChange={this.handleSelect} >
                {this.props.symptomChoices.map(symptom => 
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
    currentUser: state.user.currentUser,
    symptomChoices: state.medical.symptomChoices
	}
}

const mapDispatchToProps = (dispatch) => {
  return{
    addSymptom: (event, userId, symptomId, history) => {dispatch(addSymptom(event, userId, symptomId, history))},
    addToMap: (event, markerData) => {dispatch(addToMap(event, markerData))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostToMap)