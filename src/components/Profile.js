import React, {Component} from 'react';
import {connect} from 'react-redux';
import MarkerCard from './MarkerCard'

class Profile extends Component {

  render() {
    console.log(this.props)
    let createdMarkers = this.props.user.created_markers
    let bookmarks = this.props.user.bookmarks

    return(
    <div className="profile">
      <h2 className="welcome">Welcome {this.props.user.username}</h2>
      <div className="bookmarks">
        { !bookmarks ? 
        <h4 className="no-markers">Looks like you have no bookmarks..</h4> 
        :
        bookmarks.map(bookmark => <MarkerCard history={this.props.history} user={this.props.user} data={bookmark}/>)
        }
      </div>
      <div className="created-markers">
        { !createdMarkers ?
        <h4 className="no-markers">Looks like you haven't posted a marker..</h4> 
        :
        createdMarkers.map(marker => <MarkerCard history={this.props.history} data={marker}/>) 
        }
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser
  }
}

export default connect(mapStateToProps)(Profile)