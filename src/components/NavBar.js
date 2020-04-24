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
			<div className="nav-item">
				<button onClick={this.logout}className="logout-button">Logout</button>
			</div>
				:
			<div className="nav-item">
				<NavLink to="/login">Login</NavLink>
			</div>
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