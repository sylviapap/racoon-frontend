import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import fetchInitialMap from './actions/fetchInitialMap'
import getCurrentUser from './actions/getCurrentUser'

import MainContainer from './containers/MainContainer'
import MapContainer from './containers/MapContainer'
import NavBar from './components/NavBar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import MarkerCard from './components/MarkerCard'

class App extends Component {   
  
  componentDidMount() {
    this.props.getCurrentUser();
    this.props.fetchInitialMap();
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
          <Route path="/profile" render={(props) => <Profile {...props}/>}/>
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    initialMap: state.initialMap
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => { dispatch(getCurrentUser()) },
    fetchInitialMap: () => { dispatch(fetchInitialMap()) }
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))