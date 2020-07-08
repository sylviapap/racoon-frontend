import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import getCurrentUser from './actions/getCurrentUser'
import fetchSymptomList from './actions/fetchSymptomList'
import errorToggle from './actions/errorToggle'

import GoogleMap from './containers/GoogleMap'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import SideBar from './components/SideBar'
import MarkerCard from './components/MarkerCard'
import PostToMap from './components/PostToMap'
import SymptomChecker from './components/SymptomChecker'
import MedicalProfile from './components/MedicalProfile'
import Audio from './components/Audio'
import NoAuth from './components/NoAuth'

class App extends Component {  

  componentDidMount() {
    this.props.getCurrentUser();
    this.props.fetchSymptomList();
  }

  handleErrorClick = () => {
    this.props.errorToggle()
  }

  handleReturnClick = () => {
    this.props.history.push("/map")
  }
  
  render() {
    const loggedIn = this.props.currentUser !== undefined && this.props.currentUser.id
    // console.log(!!loggedIn)

    return (
      <Fragment>
        {this.props.error.error ? 
        <div className="warning-window">
          <div className="warning-message">
          <header className="error-header">
            <h1 className="error-header">Error</h1>
            <i className="fa fa-times close" onClick={this.handleErrorClick} />
          </header>
            <ul>{this.props.error.messages.map(message => <li key={this.props.error.messages.indexOf(message)}>{message}</li>)}</ul>
          </div>
        </div> 
          : 
          null}

      <Route path="/map" component={GoogleMap} />

      <Route 
        exact path="/checker" 
        component={SymptomChecker} 
        />

      <Route exact path="/">
        <Home loggedIn={loggedIn} user={this.props.currentUser}/>
      </Route>
      <Route path="/audio" component={Audio} />
      <Route 
        exact path="/map/no-auth" 
        render={(props) => 
          <NoAuth {...props} 
            handleReturnClick={this.handleReturnClick}
            loggedIn={loggedIn}
          />}/>


        {loggedIn ?  (
          <Switch>
            <Route 
              exact path="/map/my-markers" 
              render={(props) => 
              <SideBar {...props} 
                handleReturnClick={this.handleReturnClick}
                />}
              /> 
            <Route 
              path="/map/post" 
              render={(props) => 
                <PostToMap {...props} handleReturnClick={this.handleReturnClick} />} 
              />
            <Route 
              exact path="/map/markers/:id" 
              render={(props) => 
                <MarkerCard {...props} 
                  handleReturnClick={this.handleReturnClick}
                />}
              />

            <Route 
              path="/medical" 
              component={MedicalProfile} 
            />

            <Route exact path="/checker" />
            <Route path="/audio" />
            <Route exact path="/map" />
            <Route path="/map/post" />
            <Route exact path='/' />
          </Switch>
          )
          : 
          (
          <Fragment>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/checker" />
              <Route exact path="/map" />
              <Route exact path="/" />
          </Switch>
          <Switch>
            {/* This redirect is very weird - make sure to only go to a map marker page by clicking on more info, i.e. hard refresh on a map marker redirects to error if logged in */}
            {!localStorage.token ? <Redirect from='/map/markers/:id' to='/map/no-auth' /> : null}
            {!localStorage.token ? <Redirect from='/medical' to='/map/no-auth' /> : null}
            
            <Route path='/map/no-auth' />
          </Switch>
          </Fragment>
          )

        }
        </Fragment>
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    error: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => { dispatch(getCurrentUser()) },
    errorToggle: () => { dispatch(errorToggle())},
    fetchSymptomList: () => {dispatch(fetchSymptomList())}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))