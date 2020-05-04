import React, {Component} from 'react';
import {connect} from 'react-redux';
import CreatedMarker from './CreatedMarker'
import Bookmark from './Bookmark'

class Profile extends Component {



  render() {
    let name = this.props.currentUser.first_name
    let titleName = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase()
    console.log(titleName)
    return(
    <div className="profile page">
      <i className="fa fa-times-circle return" onClick={this.props.handleReturnClick}/>
      <h1 className="welcome">My Info</h1>
      {!!this.props.currentUser ? 
        <p>Profile For: {titleName} {this.props.currentUser.last_name}</p>
      :
        <p>You are not logged in</p>
      }

      <div className="bookmarks card">
        <h2>Your Bookmarks</h2>
        { this.props.bookmarks.length === 0 ? 
        <p className="no-markers">You have none...</p> 
        :
        this.props.bookmarks.map(bookmark => <Bookmark key={bookmark.id} bookmark={bookmark} history={this.props.history}/>)
        }
      </div>
      <div className="created-markers card">
        <h2>Your Posts</h2>
        { this.props.createdMarkers.length === 0 ?
        <p className="no-markers">You haven't posted yet...</p> 
        :
        this.props.createdMarkers.map(marker => <CreatedMarker key={marker.id} marker={marker} history={this.props.history}/>) 
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