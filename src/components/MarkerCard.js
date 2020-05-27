import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import PostComment from './PostComment'
import addBookmark from '../actions/addBookmark'
import deleteBookmark from '../actions/deleteBookmark'
import deleteCreatedMarker from '../actions/deleteCreatedMarker'

class MarkerCard extends Component {

	state = {
		selectedMarker: {
			title: "",
			address: "",
			comments: [],
			creator: {}
		},
		newComments: []
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.id !== prevProps.match.params.id) {
			let id = parseInt(this.props.match.params.id)
			let marker = this.props.myMap.filter(marker => marker.id === id)
			this.setState({selectedMarker: marker})
		}
	}

	handleCommentPost = (event, comment) => {
		const newComment = {
			content: comment.content,
			user_first_name: this.props.currentUser.first_name,
			id: comment.id
		}
		this.setState(prevState => {
			prevState.newComments.push(newComment); 
			return prevState
		})
	}

	addToBookmarks = (event) => {
		let id = parseInt(this.props.match.params.id)
		let markerData = {
			user_id: this.props.currentUser.id,
			map_marker_id: id
		}
		this.props.addBookmark(event, markerData, this.props.history)
	}

	removeBookmark = () => {
		let mapMarkerId = parseInt(this.props.match.params.id);
		let selectedBookmark = this.props.bookmarks.find(b => b.map_marker.id === mapMarkerId)
		this.props.deleteBookmark(selectedBookmark.id);
	}

	delete = () => {
		let id = parseInt(this.props.match.params.id);
		this.props.deleteCreatedMarker(id, this.props.history);
	}

	render() {
		let id = parseInt(this.props.match.params.id)
		let marker = this.props.myMap.filter(marker => marker.id === id)[0]
		
		if (marker) {
			let bookmarkFilter = this.props.bookmarks.filter(b => b.map_marker.id === marker.id)
			let createdFilter = this.props.createdMarkers.filter(m => m.id === marker.id)
		return(
			<div className="marker page" key={marker.id}>
				<i className="fa fa-times-circle return" onClick={this.props.handleReturnClick}/>
				<header className="marker"><h1 className="marker">Marker Info</h1></header>
				<h1 className="marker-page-title">{marker.title}</h1>
				{createdFilter.length ? <div><p>You posted this marker!</p><button onClick={this.delete}>Delete From Map</button></div> : null}
				<span>Address: {marker.address}</span>
				<h2>User's Self Reported Symptoms: </h2>
				{!!marker.creator ? (<ul>{marker.creator.symptoms.map(s => <li key={s.id}>{s.common_name}</li>)}</ul>) : null}
				
					{bookmarkFilter.length !== 0 ? 
					<button onClick={this.removeBookmark}className="bookmark-btn"><i className="fa fa-folder"></i>Remove Bookmark</button>
					:
					<button onClick={this.addToBookmarks}className="add-bookmark-button"><i className="fa fa-flag"></i>Add To Bookmarks</button>
					}
				<h2>Comments:</h2>
				{marker.comments ? 
				(marker.comments.map(comment => <Comment comment={comment} key={comment.id}/>))
				:
				<p>Looks like no comments  yet...be the first!</p>
			}
			{this.state.newComments.length !== 0 ? 
				(this.state.newComments.map(comment => <Comment comment={comment} key={comment.id}/>))
				:
				null
			}
			<PostComment handleCommentPost={this.handleCommentPost} markerId={marker.id} />

			</div>
		)
		}
		else {
			return null
		}
	}
}

const mapStateToProps = (state) => {
  return {
		currentUser: state.user.currentUser,
		bookmarks: state.user.bookmarks,
		createdMarkers: state.user.createdMarkers,
		myMap: state.map.myMap
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addBookmark: (event, markerData, history) => {dispatch(addBookmark(event, markerData, history))},
		deleteBookmark: (id) => {dispatch(deleteBookmark(id))},
		deleteCreatedMarker: (id, history) => {dispatch(deleteCreatedMarker(id, history))}
	}
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerCard)