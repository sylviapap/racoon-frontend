import React, {Component} from 'react';
import {connect} from 'react-redux';
import MarkerCard from './MarkerCard'

class Profile extends Component {

  render() {
    console.log(this.props)

    return(
    <div className="profile">
      {!!this.props.user.id ? 
        <h2 className="welcome">Welcome {this.props.user.username}</h2>
      :
        <p>You are not logged in</p>
      }

      <div className="bookmarks">
        { !this.props.user.bookmarks ? 
        <h4 className="no-markers">Looks like you have no bookmarks..</h4> 
        :
        this.props.user.bookmarks.map(bookmark => <MarkerCard history={this.props.history} user={this.props.user} data={bookmark}/>)
        }
      </div>
      <div className="created-markers">
        { !this.props.user.created_markers ?
        <h4 className="no-markers">Looks like you haven't posted a marker..</h4> 
        :
        this.props.user.created_markers.map(marker => <MarkerCard history={this.props.history} data={marker}/>) 
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