import React, {Component} from 'react';
import { connect } from 'react-redux';
import {API_ROOT, headers} from '../services/api'

class PostComment extends Component{
  state = {
    content: ""
  }

  handleChange = (event) => {
    this.setState({content: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`${API_ROOT}/comments`, {
      method: "POST", 
      headers: headers,
      body: JSON.stringify({
        user: this.props.user,
        map_event_id: this.props.markerId,
        content: this.state.content
      })
    })
      .then(response => response.json())
      .then(json => {console.log(json);
        this.setState({content: ""})
      })
  }

  render() {
    console.log(this.props)
    return(
      <form onSubmit ={this.handleSubmit}className="post-container">
        <textarea
          value={this.state.content}
          onChange={this.handleChange}
          placeholder="Write a comment"
          className="comment-input"/>
        <input className="post" type="submit" value="POST"/>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser
  }
}

export default connect(mapStateToProps)(PostComment)