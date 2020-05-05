import React, { Component } from 'react'
import { connect } from 'react-redux'
import deleteBookmark from '../actions/deleteBookmark'

class Bookmark extends Component {

	delete = () => {
		let id = this.props.bookmark.id;
		this.props.deleteBookmark(id);
	}

	view = () => {
		let id = this.props.bookmark.map_marker.id;
		this.props.history.push(`/map/markers/${id}`)
	}

	render() {
		console.log(this.props)
		return(
			<div className="created-bookmark item">
				<h2 className="bookmark-page-title">Title: {this.props.bookmark.map_marker.title}</h2>
				<p>Address: {this.props.bookmark.map_marker.address}</p>
				<button onClick={this.delete}>Remove From List</button>
				<button onClick={this.view}>View</button>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
  deleteBookmark: (id) => {dispatch(deleteBookmark(id))}
})

export default connect(null, mapDispatchToProps)(Bookmark)
