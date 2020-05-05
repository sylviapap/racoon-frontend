import React from 'react'

const Home = () => {
    return (
      <div className="home-page-container">
      <div className="home-page">
        <div className="main-square">Welcome to
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

        <p>virus (COVID-19
        )</p></div>
        
        <div className="row">
          <a href="/map" className="home">Map</a>
        </div>
        <div className="row">
          <a href="/checker" className="home">Symptom Checker</a>
        </div>
        
        <div className="row">
          <a href="/signup" className="home">Sign Up</a> or <a href="/login" className="home">Log In</a>
        </div>
      </div>
      </div>
    )
  }

export default Home