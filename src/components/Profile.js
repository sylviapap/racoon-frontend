import React, {Component} from 'react';
import {connect} from 'react-redux';
import CreatedMarker from './CreatedMarker'
import Bookmark from './Bookmark'

// need bookmarks and created markers in state - initial load is empty array so ternaries don't work

class Profile extends Component {

  componentDidUpdate() {
  }

  render() {
    console.log(this.props.currentUser)
    return(
    <div className="profile">
      {!!this.props.currentUser.id ? 
        <h1 className="welcome">Welcome to your profile, {this.props.currentUser.username}</h1>
      :
        <p>You are not logged in</p>
      }

      <div className="bookmarks card">
        <h2>Your Bookmarks</h2>
        { this.props.bookmarks.length === 0 ? 
        <p className="no-markers">Looks like you have no bookmarks..</p> 
        :
        this.props.currentUser.bookmarks.map(bookmark => <Bookmark key={bookmark.id} bookmark={bookmark}/>)
        }
      </div>
      <div className="created-markers card">
        <h2>Your Created Markers</h2>
        { this.props.createdMarkers.length === 0 ?
        <p className="no-markers">Looks like you haven't posted a marker..</p> 
        :
        this.props.currentUser.created_markers.map(marker => <CreatedMarker key={marker.id} marker={marker}/>) 
        }
      </div>
      <div className="card">
        <p>Click here to post to the map</p>
        <p>Click here to go to the map and save</p>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Profile)