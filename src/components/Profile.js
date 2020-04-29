import React, {Component} from 'react';
import {connect} from 'react-redux';
import CreatedMarker from './CreatedMarker'
import Bookmark from './Bookmark'

class Profile extends Component {

  render() {
    console.log(this.props.currentUser)
    return(
    <div className="profile">
      {!!this.props.currentUser ? 
        <h1 className="welcome">Welcome to your profile, {this.props.currentUser.username}</h1>
      :
        <p>You are not logged in</p>
      }

      <div className="bookmarks card">
        <h2>Your Bookmarks</h2>
        { this.props.bookmarks.length === 0 ? 
        <p className="no-markers">You have none.. go to a marker's info page to save a bookmark</p> 
        :
        this.props.bookmarks.map(bookmark => <Bookmark key={bookmark.id} bookmark={bookmark}/>)
        }
      </div>
      <div className="created-markers card">
        <h2>Markers You've Posted</h2>
        { this.props.createdMarkers.length === 0 ?
        <p className="no-markers">You haven't posted yet... go to the map to post</p> 
        :
        this.props.createdMarkers.map(marker => <CreatedMarker key={marker.id} marker={marker}/>) 
        }
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    bookmarks: state.user.bookmarks,
    createdMarkers: state.user.createdMarkers
  }
}

export default connect(mapStateToProps)(Profile)