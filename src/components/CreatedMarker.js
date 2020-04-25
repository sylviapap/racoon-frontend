import React, { Component } from 'react'
import Comment from './Comment'

class CreatedMarker extends Component {

	render() {
		return(
			<div className="created-marker">
				<h1 className="marker-page-title">Title: {this.props.marker.title}</h1>
				<p>Address: {this.props.marker.address}</p>
				<h2>Comments:</h2>
				<ul>{!!this.props.marker.comments ? 
				(this.props.marker.comments.map(comment => <Comment comment={comment} key={comment.id}/>))
				:
				<p>No comments</p>
			}</ul>
			</div>
		)
	}
}

export default CreatedMarker
