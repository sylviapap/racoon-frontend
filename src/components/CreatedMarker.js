import React, { Component } from 'react'
import {API_ROOT, headers} from '../services/api'

class CreatedMarker extends Component {

	delete = () => {
		fetch(`${API_ROOT}/bookmarks/${this.props.marker.id}`, 
		{method: "DELETE"})
	}

	render() {
		console.log(this.props.marker)
		return(
			<div className="created-marker item">
				<h1 className="marker-page-title">Title: {this.props.marker.title}</h1>
				<p>Address: {this.props.marker.address}</p>
				<button onClick={this.delete}>Remove</button>
			</div>
		)
	}
}

export default CreatedMarker
