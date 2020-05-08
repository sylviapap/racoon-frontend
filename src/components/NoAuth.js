import React from 'react'

const NoAuth = (props) => {
    return (
      <div className="warning-window">
        <div className="warning-message">
        <i className="fa fa-times-circle return" onClick={props.handleReturnClick}/>
        {props.loggedIn ? <span className="warning">Error: page does not exist</span> : <span className="warning">Please <a href="/login" className="warning">Log In</a> or <a href="/signup" className="warning">Sign Up</a> to view this page</span>}
        
      </div></div>
    )
  }

export default NoAuth