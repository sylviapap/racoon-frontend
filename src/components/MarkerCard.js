import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import PostComment from './PostComment'
import {API_ROOT} from '../services/api'
import addBookmark from '../actions/addBookmark'

class MarkerCard extends Component {
	constructor() {
		super()
		this.state = {
			markerData: {
				comments: []
			}
		}
	}

	componentDidMount() {
		let id = this.props.match.params.id
		fetch(`${API_ROOT}/map_markers/${id}`)
			.then(response => response.json())
			.then(json => {this.setState({markerData: json})})
	}

	handleCommentPost = (event, comment) => {
		const newComment = {
			content: comment.content,
			user: this.props.currentUser,
			id: comment.id
		}
		this.setState(prevState => {
			prevState.markerData.comments.push(newComment); 
			return prevState
		})
	}

	addToBookmarks = (event) => {
		let markerData = {
			user_id: this.props.currentUser.id,
			map_marker_id: this.state.markerData.id
		}

		this.props.addBookmark(event, markerData, this.props.history)
	}

	render() {
		return(
			<div className="marker-page">
				<h1 className="marker-page-title">{this.state.markerData.title}</h1>
				<p>{this.state.markerData.address}</p>
				<h2>User's Self Report Symptoms: </h2>
					<p>{this.state.markerData.message}</p>
				<button onClick={this.addToBookmarks}className="add-bookmark-button">Add To Bookmarks</button>
				<h2>Comments:</h2>
				{this.state.markerData.comments.length ? 
				(this.state.markerData.comments.map(comment => <ul><Comment comment={comment} key={comment.id}/></ul>))
				:
				<p>Looks like no comments  yet...be the first!</p>
			}
			<PostComment handleCommentPost={this.handleCommentPost} markerId={this.state.markerData.id} />

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
	return {
		addBookmark: (event, markerData, history) => {dispatch(addBookmark(event, markerData, history))}
	}
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerCard)
