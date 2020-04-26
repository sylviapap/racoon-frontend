import React, { Component } from 'react'
import {API_ROOT, headers} from '../services/api'

class Bookmark extends Component {

	delete = () => {
		fetch(`${API_ROOT}/bookmarks/${this.props.bookmark.id}`, 
		{method: "DELETE"})
	}

	render() {
		console.log(this.props.bookmark)
		return(
			<div className="created-bookmark item">
				<h1 className="bookmark-page-title">Title: {this.props.bookmark.map_marker.title}</h1>
				<p>Address: {this.props.bookmark.map_marker.address}</p>
				<button onClick={this.delete}>Remove</button>
			</div>
		)
	}
}

export default Bookmark
