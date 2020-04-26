import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import PostComment from './PostComment'

class MarkerCard extends Component {
	constructor() {
		super()
		this.state = {
			markerData: {}
		}
	}

	componentDidMount() {
		let id = this.props.match.params.id
		fetch(`http://localhost:3001/api/v1/map_markers/${id}`)
			.then(response => response.json())
			.then(json => {this.setState({markerData: json})})
	}

	handleCommentPost = (event, comment) => {
		const newComment = {
			content: comment.content,
			user: this.props.currentUser
		}
		this.setState(prevState => {
			prevState.markerData.comments.push(newComment); 
			return prevState
		})
	}

	render() {
		return(
			<div className="marker-page">
				<h1 className="marker-page-title">{this.state.markerData.title}</h1>
				<p>{this.state.markerData.address}</p>
				<h2>Comments:</h2>
				<ul>{this.state.markerData.comments ? 
				(this.state.markerData.comments.map(comment => <Comment comment={comment} key={comment.id}/>))
				:
				null
			}</ul>
			<PostComment handleCommentPost={this.handleCommentPost} markerId={this.state.markerData.id}/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerCard)
