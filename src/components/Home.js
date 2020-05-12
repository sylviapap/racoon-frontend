import React, { Fragment } from 'react'

const Home = (props) => {
    return (
      <div className="home-page-container">
      <div className="home-page">
        <div className="main-square">
    
        <div className="home-letters" id="box">
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
        <div className="home-buttons">
          <div className="row">
            <a href="/map" className="home">View the Map</a>
          </div>
          <div className="row">
            <a href="/checker" className="home">Check Symptoms</a>
          </div>
          {!localStorage.token ? (
            <Fragment>
          <div className="row">
            <a href="/signup" className="home">Sign Up</a>
            </div>
            <div className="row"><a href="/login" className="home">Log In</a>
          </div>
          </Fragment>) : <div className="row"><a href="/medical" className="home">View Your Profile</a></div>}
      
        </div>
      </div>
      </div>
    )
  }

export default Home