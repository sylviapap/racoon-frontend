import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import NavBar from './NavBar'

class MedicalProfile extends Component {

  render() {
    let name = this.props.currentUser.first_name
    let titleName = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase()
    return(
      <Fragment>
      <NavBar />
    <div className="profile page">
      <h1 className="welcome">My Info</h1>
      {!!this.props.currentUser ? 
      <div className="medical-info">
        <p>Medical Information For: {titleName} {this.props.currentUser.last_name}</p>
        <p>Saved Diagnoses:</p><ul>{this.props.currentUser.diagnoses.map(d => <li>{d.description}</li>)}</ul>
      </div>
      :
        <p>You are not logged in</p>
      }
    </div>
    </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(MedicalProfile)