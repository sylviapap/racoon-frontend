import React, { Component } from 'react';
import { connect } from 'react-redux'
import signUp from '../actions/signUp'

class SignUp extends Component{
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: ""        
    }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { handleChange } = this;
    const { firstname, lastname, password, password_confirmation, email } = this.state;

    return (
      <div className="signup page">
        <form onSubmit={(event) => {this.props.signUp(event, this.state, this.props.history)}}>
          <div className="field">
            <label><i className="fa fa-user"/></label>
            <input
              name="firstname"
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label><i className="fa fa-user-o"/></label>
            <input
              name="lastname"
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label><i className="fa fa-envelope"/></label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label><i className="fa fa-lock"/></label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
          </div>          
          <div className="field">
            <label><i className="fa fa-check"/></label>
            <input 
              onChange={handleChange}
              name="password_confirmation"
              type="password"
              value={password_confirmation}
              placeholder="Confirm Password"
              />          
          </div>
          <input type="submit" className="button" value="Sign Up"/>
        </form>
      </div>
      );
    }
  }
  
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (event, userInput, history) => { dispatch(signUp(event, userInput, history)) }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)