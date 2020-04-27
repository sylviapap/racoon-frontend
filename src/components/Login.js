import React, { Component } from 'react';
import { connect } from 'react-redux';
import logIn from '../actions/logIn';

class Login extends Component {
  constructor(){
    super()
    this.state = {
      username: "",
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
    const { username, password } = this.state;
    return (
      <div className="login">
        <form onSubmit={(event) => {this.props.logIn(event, this.state, this.props.history)}}>
          <div className="field">
          <i className="glyphicon glyphicon-user"></i>
            <label>Username</label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div className="field">
          <i className="glyphicon glyphicon-cloud"></i>
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="button">
            Submit
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
    currentUser: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)