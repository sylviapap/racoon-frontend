import React, { Component } from 'react'
import { connect } from 'react-redux'
import deleteBookmark from '../actions/deleteBookmark'

class Bookmark extends Component {

	delete = () => {
		let id = this.props.bookmark.id;
		this.props.deleteBookmark(id);
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

const mapDispatchToProps = (dispatch) => ({
  deleteBookmark: (id) => {dispatch(deleteBookmark(id))}
})

export default connect(null, mapDispatchToProps)(Bookmark)
