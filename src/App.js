import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import {fetchUsers} from './actions/fetchUsers'
import {fetchInitialMap} from './actions/fetchInitialMap'

import MainContainer from './containers/MainContainer'
import MapContainer from './containers/MapContainer'
import Login from './components/Login'
import SignUp from './components/SignUp'
import InfoCard from './components/InfoCard'

class App extends Component {   
  
  componentDidMount() {
    // this.props.fetchUsers()
    this.props.fetchInitialMap()
  }
  
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => 
          <MapContainer initialMap={this.props.initialMap}/>} 
          />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/main" render= { () => { return(
          <MainContainer users={this.props.users}/>)}}
          />
        <Route exact path="/info/:id" render={(props) => 
          <InfoCard {...props} />} 
          />
      </Switch>
    );
  }
  
}

// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//     initialMap: state.initialMap
//   }
// }

const mapDispatchToProps = state => {
  return {
    initialMap: state.initialMap
  }
}

export default connect(mapDispatchToProps, {fetchInitialMap})(App)