import React, { Component } from 'react'

export default class MainContainer extends Component {
    listUsers = () => {
        return this.props.users.map(user => <span key={user.id}> {user.username} </span>)
      }
    render() {
        return (
            <div className="App">
            <div className="header">
                <header>Header</header>
            </div>
            <div className="topnav">
                <p>Link</p>
            </div>
            <div className="row">
            </div>

            <div className="column">
            <h2>Users</h2>
        <p>{this.listUsers()}</p>
            </div>
  
            <div className="column">
                <h2>Column</h2>
                <p>Text</p>
            </div>
          </div>
        )
    }
}
