import React, { Component, Fragment } from 'react';
// import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class NavBar extends Component{
    render(){
        return(
            <Fragment >
                <div className="nav-item">
                    <NavLink to="/">Home</NavLink>
                </div>
                
                <div className="nav-item">
                    <NavLink to="/login">Login</NavLink>
                </div>
            </Fragment>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         user: state.user.currentUser
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         clearCurrentUser: () => dispatch({ type: "CLEAR_CURRENT_USER" })

//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

export default NavBar