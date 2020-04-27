import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import fetchInitialMap from './actions/fetchInitialMap'
import getCurrentUser from './actions/getCurrentUser'
import errorToggle from './actions/errorToggle'

import MapContainer from './containers/MapContainer'
import NavBar from './components/NavBar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import MarkerCard from './components/MarkerCard'
import PostToMap from './components/PostToMap'

class App extends Component {   
  
  componentDidMount() {
    this.props.getCurrentUser();
    this.props.fetchInitialMap();
  }

  handleErrorClick = () => {
    this.props.errorToggle()
  }
  
  render() {
    return (
      <div className="App">
        {this.props.error.error ? 
        <div className="warning-message">
          <i className="fa fa-times" onClick={this.handleErrorClick} />
          <div className="header">
            Error
          </div>
            <p>{this.props.error.messages}</p>
          </div> 
          : 
          null}

      <NavBar />
        <Switch>
          <Route exact path="/" component={MapContainer} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />

          {this.props.user.currentUser !== undefined && this.props.user.currentUser.id ?  (
              <Switch>
                <Route exact path="/profile" render={(props) => <Profile {...props}/>}/> 
                <Route exact path="/post" render={(props) => <PostToMap {...props} />} />
                <Route exact path="/markers/:id" render={(props) => <MarkerCard {...props} />} />
                <Route render={() => <Redirect to= "/" />}/>
              </Switch>
              )
              : 
              <Redirect to="/"/>
              }
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => { dispatch(getCurrentUser()) },
    fetchInitialMap: () => { dispatch(fetchInitialMap()) },
    errorToggle: () => { dispatch(errorToggle())}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))