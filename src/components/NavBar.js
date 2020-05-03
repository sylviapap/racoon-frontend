import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../racoon-logo.png';

class NavBar extends Component {

  logout = () => {
		localStorage.clear()
		this.props.clearCurrentUser()
	}

  render() {
		// const loggedIn = !!this.props.currentUser.id
		return(
		<div className="nav-bar">
			<NavLink to="/map"><img src={logo} className="nav-item" alt="racoon-logo" id="racoon-logo"/></NavLink>
			<div className="nav-item">
				<NavLink to="/map">Map</NavLink>
			</div>
			<div className="nav-item">
			<NavLink to="/checker">Symptom Check</NavLink>
			</div>
		{ this.props.currentUser !== undefined && this.props.currentUser.id ?
			<Fragment>
				<div className="nav-header">Welcome, {this.props.currentUser.first_name}</div>
				
				<div className="nav-item">
					<NavLink to="/map/profile">Profile</NavLink>
				</div>

				<div className="nav-item">
					<NavLink to="/map/post">Post</NavLink>
				</div>

				<div className="nav-item" onClick={this.logout}>
					<NavLink to="/">Logout</NavLink>
				</div>
			</Fragment>
				:
			<Fragment>
				<div className="nav-item">
					<NavLink to="/login">Login</NavLink>
				</div>
				<div className="nav-item">
				<NavLink to="/signup">Sign Up</NavLink>
				</div>
			</Fragment>
			}
		</div>
		)
  }
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.user.currentUser
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCurrentUser: () => dispatch({ type: "CLEAR_CURRENT_USER" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)