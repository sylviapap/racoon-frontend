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
                <div className="column">
                    <form>
                    <div className="field">
                    <i className="glyphicon glyphicon-user"></i>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                    />
                    </div>
                    <div className="field">
                    <i className="glyphicon glyphicon-cloud"></i>
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    </div>
                    <button type="submit" className="button">
                    Submit
                    </button>
                    </form>
                </div>

            <div className="column">
                <h2>Users</h2>
        <p>{this.listUsers()}</p>
            </div>
  
            <div className="column">
                <h2>Column</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet pretium urna. Vivamus venenatis velit nec neque ultricies, eget elementum magna tristique. Quisque vehicula, risus eget aliquam placerat, purus leo tincidunt eros, eget luctus quam orci in velit. Praesent scelerisque tortor sed accumsan convallis.</p>
            </div>
          </div>
        </div>
        )
    }
}
