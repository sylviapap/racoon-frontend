import React, {Component} from 'react';
import { connect } from 'react-redux';
import addToMap from '../actions/addToMap'

class PostToMap extends Component{
  state = {
    fields: {
      latitude: [],
      longitude: [],
      title: [], 
      address: []
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  showPosition = (position) => {
    this.setState({ fields: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      title: [], 
      address: []
    }})
  }

  handleChange = (event) => {
    const newFields = { ...this.state.fields, [event.target.name]: event.target.value };
    this.setState({ fields: newFields });
    console.log(this.state.fields)
  };

  handleSubmit = (event) => {
    event.preventDefault()
    let markerData = {
      user_id: this.props.currentUser.id,
      latitude: this.state.fields.latitude,
      longitude: this.state.fields.longitude,
      title: this.state.fields.title, 
      address: this.state.fields.address
    }
    this.props.addToMap(event, markerData, this.props.history);
    this.setState({ 
      fields: {
        latitude: [],
        longitude: [],
        title: [], 
        address: []
    }});
  }

  render() {
    return(
      <form onSubmit ={this.handleSubmit}className="post-container">
        <label>Title</label>
        <input name="title" type="text" value={this.state.fields.title} onChange={this.handleChange}/>
        <label>Address</label>
        <input name="address" type="text" value={this.state.fields.address} onChange={this.handleChange}/>
        <label>Latitude</label>
        <input name="latitude" type="number" value={this.state.fields.latitude} onChange={this.handleChange}/>
        <label>Longitude</label>
        <input name="longitude" type="number" value={this.state.fields.longitude} onChange={this.handleChange}/>

        <input className="post" type="submit" value="POST"/>
      </form>
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
      addToMap: (event, markerData, history) => {dispatch(addToMap(event, markerData, history))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostToMap)