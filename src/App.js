import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import {fetchUsers} from './actions/fetchUsers'

import MainContainer from './containers/MainContainer'
import MapContainer from './containers/MapContainer'
import Login from './components/Login'
import SignUp from './components/SignUp'

class App extends Component {   
  
  componentDidMount() {
    this.props.fetchUsers()
  }
  
  render() {
    return (
      <Fragment>
        <Route exact path="/" render={(props) => <MapContainer {...props}/>} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/main" render= { () => { return(
        <MainContainer users={this.props.users}/>)}
        }
        />
      </Fragment>
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchUsers: (history) => { dispatch(fetchUsers(history)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)