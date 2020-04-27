import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {

  logout = () => {
		localStorage.clear()
		this.props.clearCurrentUser()
	}

  render() {
		const loggedIn = !!this.props.user.id
		return(
		<div className="nav-bar">
			<div className="nav-item">
				<NavLink to="/">Home</NavLink>
			</div>
		{ loggedIn ?
			<Fragment>
				<div className="nav-header">Welcome, {this.props.user.username}</div>
				<div className="nav-item" onClick={this.logout}>
					<NavLink to="/">Logout</NavLink>
				</div>
				
				<div className="nav-item">
					<NavLink to="/profile">Your Profile</NavLink>
				</div>

				<div className="nav-item">
					<NavLink to="/post">Post To Map</NavLink>
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
		user: state.currentUser
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCurrentUser: () => dispatch({ type: "CLEAR_CURRENT_USER" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)