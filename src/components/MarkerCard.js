import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import PostComment from './PostComment'
import {API_ROOT} from '../services/api'
import addBookmark from '../actions/addBookmark'


class MarkerCard extends Component {

	state = {
		selectedMarker: {
			comments: []
		}
	}

	componentDidMount() {
		console.log(this.props)
		let id = parseInt(this.props.match.params.id)
		// console.log(id)
		// console.log(this.props.initialMapData)
		// let selectedMarker = this.props.initialMapData.find(m => m.id == id)
		// console.log(selectedMarker)
		// this.setState({selectedMarker: selectedMarker})
		fetch(`${API_ROOT}/map_markers/${id}`)
		.then(response => response.json())
		.then(json => {console.log(json);
			this.setState({selectedMarker: json})})
	}

	componentDidUpdate(prevProps) {
		console.log("update")
		if (this.props.match.params.id !== prevProps.match.params.id) {
			this.fetchData()
		}
	}

	fetchData = () => {
		let id = parseInt(this.props.match.params.id)
		fetch(`${API_ROOT}/map_markers/${id}`)
		.then(response => response.json())
		.then(json => {console.log(json);
			this.setState({selectedMarker: json})}
		)
	}

	handleCommentPost = (event, comment) => {
		const newComment = {
			content: comment.content,
			user: this.props.user.currentUser,
			id: comment.id
		}
		this.setState(prevState => {
			prevState.selectedMarker.comments.push(newComment); 
			return prevState
		})
	}

	addToBookmarks = (event) => {
		let id = parseInt(this.props.match.params.id)
		let selectedMarker = {
			user_id: this.props.user.currentUser.id,
			map_marker_id: id
		}
		this.props.addBookmark(event, selectedMarker, this.props.history)
	}

	render() {
		console.log(this.props)
		let filter = this.props.user.currentUser.bookmarks.filter(b => b.map_marker.id === this.state.selectedMarker.id)
		let createdFilter = this.props.user.currentUser.created_markers.filter(m => m.id === this.state.selectedMarker.id)
		console.log(createdFilter)
		return(
			<div className="marker page">
				<i className="fa fa-times-circle return" onClick={this.props.handleReturnClick}/>
				<h1 className="marker-page-title">{this.state.selectedMarker.title}</h1>
				{createdFilter.length ? <p>You posted this marker!</p> : null}
				<p>{this.state.selectedMarker.address}</p>
				<h2>User's Self Reported Symptoms: </h2>
					<p>{this.state.selectedMarker.message}</p>
					{filter.length ? 
					<button className="bookmark-btn"><i className="fa fa-folder"></i>Bookmarked</button>
					:
					<button onClick={this.addToBookmarks}className="add-bookmark-button">Add To Bookmarks</button>
					}
				<h2>Comments:</h2>
				{this.state.selectedMarker.comments ? 
				(this.state.selectedMarker.comments.map(comment => <Comment comment={comment} key={comment.id}/>))
				:
				<p>Looks like no comments  yet...be the first!</p>
			}
			<PostComment handleCommentPost={this.handleCommentPost} markerId={this.state.selectedMarker.id} />

			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
	return {
		addBookmark: (event, selectedMarker, history) => {dispatch(addBookmark(event, selectedMarker, history))}
	}
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerCard)
