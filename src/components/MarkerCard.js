import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import PostComment from './PostComment'
import {API_ROOT} from '../services/api'
import addBookmark from '../actions/addBookmark'
import deleteBookmark from '../actions/deleteBookmark'
import deleteCreatedMarker from '../actions/deleteCreatedMarker'


class MarkerCard extends Component {

	state = {
		selectedMarker: {
			comments: [],
			creator: []
		}
	}

	componentDidMount() {
		console.log(this.props)
		let id = parseInt(this.props.match.params.id)
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
		let markerData = {
			user_id: this.props.user.currentUser.id,
			map_marker_id: id
		}
		this.props.addBookmark(event, markerData, this.props.history)
	}

	removeBookmark = () => {
		let mapMarkerId = parseInt(this.props.match.params.id);
		let selectedBookmark = this.props.user.bookmarks.find(b => b.map_marker.id === mapMarkerId)
		this.props.deleteBookmark(selectedBookmark.id);
	}

	delete = () => {
		let id = parseInt(this.props.match.params.id);
		this.props.deleteCreatedMarker(id, this.props.history);
	}

	render() {
		console.log(this.props)
		console.log(this.state)
		console.log(!!this.state.selectedMarker.creator.id)

		let filter = this.props.user.bookmarks.filter(b => b.map_marker.id === this.state.selectedMarker.id)
		let createdFilter = this.props.user.createdMarkers.filter(m => m.id === this.state.selectedMarker.id)
		return(
			<div className="marker page">
				<i className="fa fa-times-circle return" onClick={this.props.handleReturnClick}/>
				<h1 className="marker-page-title">{this.state.selectedMarker.title}</h1>
				{createdFilter.length ? <div><p>You posted this marker!</p><button onClick={this.delete}>Delete From Map</button></div> : null}
				<p>{this.state.selectedMarker.address}</p>
				<h2>User's Self Reported Symptoms: </h2>
				{!!this.state.selectedMarker.creator.id ? (<ul>{this.state.selectedMarker.creator.symptoms.map(s => <li key={s.id}>{s.common_name}</li>)}</ul>) : null}
				
					{filter.length ? 
					<button onClick={this.removeBookmark}className="bookmark-btn"><i className="fa fa-folder"></i>Remove Bookmark</button>
					:
					<button onClick={this.addToBookmarks}className="add-bookmark-button"><i className="fa fa-flag"></i>Add To Bookmarks</button>
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
		addBookmark: (event, markerData, history) => {dispatch(addBookmark(event, markerData, history))},
		deleteBookmark: (id) => {dispatch(deleteBookmark(id))},
		deleteCreatedMarker: (id, history) => {dispatch(deleteCreatedMarker(id, history))}
	}
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerCard)
