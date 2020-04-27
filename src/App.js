import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import fetchInitialMap from './actions/fetchInitialMap'
import getCurrentUser from './actions/getCurrentUser'

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
    this.setState({error: false})
  }
  
  render() {
    return (
      <div className="App">
        {this.props.error ? 
        <div className="warning-message" onClick={this.handleErrorClick}>
          <div className="header">
            Error
          </div>
            <p>{this.props.messages}</p>
            <p>Please log in or sign up</p>
          </div> 
          : 
          null}

      <NavBar />
        <Switch>
          <Route exact path="/" component={MapContainer} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />

          {localStorage.getItem("token") ?  (
              <Switch>
                <Route exact path="/profile" render={(props) => <Profile {...props}/>}/> 
                <Route exact path="/post" render={(props) => <PostToMap {...props} />} />
                <Route exact path="/markers/:id" render={(props) => <MarkerCard {...props} />} />
                <Route render={()=> <Redirect to= "/"/>}/>
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
  return {
    currentUser: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => { dispatch(getCurrentUser()) },
    fetchInitialMap: () => { dispatch(fetchInitialMap()) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))