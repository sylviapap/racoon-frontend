import React, { Component } from 'react';
import { connect } from 'react-redux';
import logIn from '../actions/logIn';

class Login extends Component {
  constructor(){
    super()
    this.state = {
      email: "",
      password: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { handleChange } = this;
    const { email, password } = this.state;
    return (
      <div className="login page">
        <h1>Welcome Back</h1>
        <form onSubmit={(event) => {this.props.logIn(event, this.state, this.props.history)}}>
          <div className="field">
            <label><i className="fa fa-user-circle"/></label>
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
          <button type="submit" className="button">
            Log In
          </button>
        </form>
        </div>
        );
      }
    }
    
const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (event, userInput, history) => { dispatch(logIn(event, userInput, history)) }
  }
}

const mapStateToProps = (state) => {
  return {
		currentUser: state.user.currentUser
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)