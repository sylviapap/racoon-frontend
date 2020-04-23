import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, NavLink, withRouter, Redirect} from 'react-router-dom';


class MarkerCard extends Component{
    constructor(){
        super()
        this.state ={
            markerData: {}
        }
    }

    componentDidMount(){
        let id = this.props.match.params.id
        fetch(`http://localhost:3001/api/v1/map_markers/${id}`)
        .then(response => response.json())
        .then(json => { console.log(json); this.setState({markerData: json})})
    }

    render(){
        return(
            <div className="marker-page">
                <h1 className="marker-page-title">{this.state.markerData.title}</h1>
                <p>{this.state.markerData.address}</p>
                <h2>Comments:</h2>
                <ul>{this.state.markerData.comments ? 
                (this.state.markerData.comments.map(comment => <li>{comment.content}</li>))
                :
                null
            }</ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MarkerCard))
