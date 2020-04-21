import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import {fetchUsers} from './actions/fetchUsers'

import MainContainer from './containers/MainContainer'
// import MapContainer from './containers/MapContainer'

class App extends Component {   
  
  componentDidMount() {
    this.props.fetchUsers()
  }
  
  render() {
    return (
      <div>
        <MainContainer users={this.props.users}/>
      </div>
    );
  }
  
}

const mapDispatchToProps = (state) => {
  return {
    users: state.users
  }
}


export default connect(mapDispatchToProps, { fetchUsers })(App)