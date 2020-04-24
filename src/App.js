import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import {fetchInitialMap} from './actions/fetchInitialMap'

import MainContainer from './containers/MainContainer'
import MapContainer from './containers/MapContainer'
import NavBar from './components/NavBar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import MarkerCard from './components/MarkerCard'

class App extends Component {   
  
  componentDidMount() {
    this.props.fetchInitialMap()
  }
  
  render() {
    return (
      <div>
        <NavBar history={this.props.history} />
        <Switch>
          <Route exact path="/" render={(props) => 
            <MapContainer {...props} initialMap={this.props.initialMap}/>} 
            />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/main" render= { () => { return(
            <MainContainer users={this.props.users}/>)}}
            />
          <Route exact path="/marker/:id" render={(props) => 
            <MarkerCard {...props} />} 
            />
        </Switch>
      </div>
    );
  }
  
}

const mapDispatchToProps = state => {
  return {
    initialMap: state.initialMap
  }
}

export default withRouter(connect(mapDispatchToProps, {fetchInitialMap})(App))