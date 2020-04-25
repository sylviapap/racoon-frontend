import React, {Component} from 'react';
import {connect} from 'react-redux';
import CreatedMarker from './CreatedMarker'

// need bookmarks and created markers in state - initial load is empty array so ternaries don't work

class Profile extends Component {

  componentDidUpdate() {

    console.log(this.props.createdMarkers)
    let array = this.props.createdMarkers.map(marker => marker.id)
    console.log(array)
  }

  render() {
    return(
    <div className="profile">
      {!!this.props.user.id ? 
        <h2 className="welcome">Welcome {this.props.user.username}</h2>
      :
        <p>You are not logged in</p>
      }

      <div className="bookmarks">
        <h2>Your Bookmarks</h2>
        { this.props.bookmarks.length === 0 ? 
        <h4 className="no-markers">Looks like you have no bookmarks..</h4> 
        :
        this.props.bookmarks.map(bookmark => <CreatedMarker key={bookmark.id} marker={bookmark}/>)
        }
      </div>
      <div className="created-markers">
        <h2>Your Created Markers</h2>
        { this.props.createdMarkers.length === 0 ?
        <h4 className="no-markers">Looks like you haven't posted a marker..</h4> 
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
    user: state.currentUser,
    bookmarks: state.bookmarks,
    createdMarkers: state.createdMarkers
  }
}

export default connect(mapStateToProps)(Profile)