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
		return(
		<div className="nav-bar">
			<div className="nav-logo">
			<NavLink to="/"><img className="racoon-logo" src={logo} alt="racoon-logo" id="racoon-logo"/></NavLink></div>
			<div className="nav-item">
				<NavLink to="/map">Map</NavLink>
			</div>
			<div className="nav-item">
			<NavLink to="/checker">Symptoms</NavLink>
			</div>
		{ this.props.currentUser !== undefined && this.props.currentUser.id ?
			<Fragment>
				<div className="nav-header">Welcome, <NavLink to="/medical">{this.props.currentUser.first_name.charAt(0).toUpperCase()+this.props.currentUser.first_name.substr(1).toLowerCase()}</NavLink></div>

				<div className="nav-item">
					<NavLink to="/map/post">Post</NavLink>
				</div>

				<div className="nav-item">
					<NavLink to="/map/my-markers">Bookmarks</NavLink>
				</div>

				<div className="nav-item">
					<NavLink to="/medical">Profile</NavLink>
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