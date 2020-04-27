import React, { Component } from 'react';
import { connect } from 'react-redux'
import signUp from '../actions/signUp'

class SignUp extends Component{
  constructor(){
    super()
    this.state = {
        username: "",
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
    const { username, password, email } = this.state;

    return (
        <div className="App">
        <form onSubmit={(event) => {this.props.signUp(event, this.state, this.props.history)}}>
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
          <i className="glyphicon glyphicon-envelope"></i>
            <label>Email</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
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
    signUp: (event, userInput, history) => { dispatch(signUp(event, userInput, history)) }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)