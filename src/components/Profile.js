import React, {Component} from 'react';
import {connect} from 'react-redux';
import CreatedMarker from './CreatedMarker'
import Bookmark from './Bookmark'

class Profile extends Component {



  render() {
    return(
    <div className="profile page">
      <i className="fa fa-times-circle return" onClick={this.props.handleReturnClick}/>
      <h1 className="welcome">My Health Profile</h1>
      {!!this.props.currentUser ? 
        <p>Profile For: {this.props.currentUser.first_name} {this.props.currentUser.last_name}</p>
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