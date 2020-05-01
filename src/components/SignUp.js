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
      <div className="signup page">
        <form onSubmit={(event) => {this.props.signUp(event, this.state, this.props.history)}}>
          <div className="field">
            <label><i className="fa fa-user"/></label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={username}
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
    currentUser: state.user.currentUser,
    
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)