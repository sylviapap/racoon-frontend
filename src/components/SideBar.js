import React from 'react';
import {connect} from 'react-redux';
import CreatedMarker from './CreatedMarker'
import Bookmark from './Bookmark'

const SideBar = (props) => {
  return(
  <div className="profile page">
    <i className="fa fa-times-circle return" onClick={props.handleReturnClick}/>
			<header className="marker"><h1 className="bookmarks">Your Markers</h1></header>
    
    <div className="bookmarks card">
      <h2>Bookmarks</h2>
      { props.bookmarks.length === 0 ? 
      <p className="no-markers">You have none... click on a map marker to save to your list!</p> 
      :
      props.bookmarks.map(bookmark => <Bookmark key={bookmark.id} bookmark={bookmark} history={props.history}/>)
      }
    </div>
    <div className="created-markers card">
      <h2>Markers You've Posted</h2>
      { props.createdMarkers.length === 0 ?
      <p className="no-markers">No posts. Go <a href="/map/post">here</a> to post now</p> 
      :
      props.createdMarkers.map(marker => <CreatedMarker key={marker.id} marker={marker} history={props.history}/>) 
      }
    </div>
  </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    bookmarks: state.user.bookmarks,
    createdMarkers: state.user.createdMarkers
  }
}

export default connect(mapStateToProps)(SideBar)