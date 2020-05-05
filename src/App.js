import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect, useRouteMatch } from 'react-router-dom';
import fetchInitialMap from './actions/fetchInitialMap'
import getCurrentUser from './actions/getCurrentUser'
import errorToggle from './actions/errorToggle'

import GoogleMap from './containers/GoogleMap'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import MarkerCard from './components/MarkerCard'
import PostToMap from './components/PostToMap'
import SymptomChecker from './components/SymptomChecker'
import MedicalProfile from './components/MedicalProfile'

class App extends Component {   
  
  componentDidMount() {
    this.props.getCurrentUser();
    this.props.fetchInitialMap();
  }

  handleErrorClick = () => {
    this.props.errorToggle()
  }

  handleReturnClick = () => {
    this.props.history.push("/map")
  }

  // handleMoreInfoClick = (place) => {
  //   let markerId = place.id
  //   this.props.history.push(`/map/markers/${markerId}`)
  // }
  
  render() {
    return (
      <Fragment>
        {this.props.error.error ? 
        <div className="warning-window">
          <div className="warning-message">
          <header>
            <h1 className="error-header">Error</h1>
            <i className="fa fa-times close" onClick={this.handleErrorClick} />
          </header>
            <ul>{this.props.error.messages.map(message => <li key={this.props.error.messages.indexOf(message)}>{message}</li>)}</ul>
          </div>
        </div> 
          : 
          null}

      <Route 
        path="/map" 
        render={(props) => 
        <GoogleMap {...props} 
          initialMapData={this.props.map.initialMap}
          />} 
      />

      <Route exact path="/" component={Home} />


        {this.props.user.currentUser !== undefined && this.props.user.currentUser.id ?  (
          <Switch>
            <Route 
              path="/map/profile" 
              render={(props) => 
              <Profile {...props} 
                handleReturnClick={this.handleReturnClick}
                />}
              /> 
            <Route 
              path="/map/post" 
              render={(props) => 
                <PostToMap {...props} handleReturnClick={this.handleReturnClick} />} 
              />
            <Route 
              path="/map/markers/:id" 
              render={(props) => 
                <MarkerCard {...props} 
                  handleReturnClick={this.handleReturnClick}
                  initialMapData={this.props.map.initialMap}
                />}
              />
            <Route 
              exact path="/checker" 
              component={SymptomChecker} 
            />
            <Route 
              exact path="/medical" 
              component={MedicalProfile} 
            />
          </Switch>
          )
          : 
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route 
              exact path="/checker" 
              component={SymptomChecker} 
            />
          </Switch>
        }
        </Fragment>
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