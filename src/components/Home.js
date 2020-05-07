import React from 'react'

const Home = (props) => {
    return (
      <div className="home-page-container">
      <div className="home-page-background">
      <div className="home-page">
        <div className="main-square">
    {props.loggedIn ? (
      <div className="logged-in">
        <span className="welcome">
          Hello, {props.user.first_name.charAt(0).toUpperCase()+props.user.first_name.substr(1).toLowerCase()}
        </span>
        <p className="home-description">
          Welcome back to
        </p>
      </div>) 
      : 
      <p className="guest">Welcome to</p>
    }
        <div className="home-letters">
        <span className="letter-r">R</span>
        <span className="letter-a">A</span>
        <span className="letter-c">C</span>
        <span className="letter-o">O</span>
        <span className="letter-o">O</span>
        <span className="letter-n">N</span>
        </div>
<span className="home-description">a web application for tracking, reporting, and symptom checking</span>
<div className="home-letters">
        <span className="letter-c">C</span>
        <span className="letter-o">O</span>
        <span className="letter-r">R</span>
        <span className="letter-o">O</span>
        <span className="letter-n">N</span>
        <span className="letter-a">A</span>
        </div>

        <span className="home-description">virus / COVID-19</span>

        </div>
        
        <div className="row">
          <a href="/map" className="home">View the Map</a>
        </div>
        <div className="row">
          <a href="/checker" className="home">Check Symptoms</a>
        </div>
        {!props.loggedIn ? (<div className="row">
          <a href="/signup" className="home">Sign Up</a> or <a href="/login" className="home">Log In</a>
        </div>) : null}
        
      </div>
      </div>
      </div>
    )
  }

export default Home