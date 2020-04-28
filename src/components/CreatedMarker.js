import React, { Component } from 'react'
import { connect } from 'react-redux'
import deleteCreatedMarker from '../actions/deleteCreatedMarker'

class CreatedMarker extends Component {

	delete = () => {
		let id = this.props.marker.id;
		this.props.deleteCreatedMarker(id);
	}

	render() {
		console.log(this.props)
		return(
			<div className="created-marker item">
				<h1 className="marker-page-title">Title: {this.props.marker.title}</h1>
				<p>Address: {this.props.marker.address}</p>
				<button onClick={this.delete}>Delete From Map</button>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
  deleteCreatedMarker: (id) => {dispatch(deleteCreatedMarker(id))}
})

export default connect(null, mapDispatchToProps)(CreatedMarker)