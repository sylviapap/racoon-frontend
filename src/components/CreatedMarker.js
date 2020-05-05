import React, { Component } from 'react'
import { connect } from 'react-redux'
import deleteCreatedMarker from '../actions/deleteCreatedMarker'

class CreatedMarker extends Component {

	delete = () => {
		let id = this.props.marker.id;
		this.props.deleteCreatedMarker(id, this.props.history);
	}

	view = () => {
		let id = this.props.marker.id;
		this.props.history.push(`/map/markers/${id}`)
	}

	render() {
		console.log(this.props)
		return(
			<div className="created-marker item">
				<h2 className="marker-page-title">Title: {this.props.marker.title}</h2>
				<p>Address: {this.props.marker.address}</p>
				<p>Coordinates: {this.props.marker.latitude}, {this.props.marker.longitude}</p>
				<p>Message: {this.props.marker.message}</p>
		<span className="info">Created: {new Date(this.props.marker.created_at).toLocaleString()}</span>
				<button onClick={this.delete}>Delete From Map</button>
				<button onClick={this.view}>View</button>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
  deleteCreatedMarker: (id, history) => {dispatch(deleteCreatedMarker(id, history))}
})

export default connect(null, mapDispatchToProps)(CreatedMarker)