import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'

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
        console.log(this.state.markerData)
        return(
            <div className="marker-page">
                <h1 className="marker-page-title">{this.state.markerData.title}</h1>
                <p>{this.state.markerData.address}</p>
                <h2>Comments:</h2>
                <ul>{this.state.markerData.comments ? 
                (this.state.markerData.comments.map(comment => <Comment data={comment} />))
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

export default connect(mapStateToProps, mapDispatchToProps)(MarkerCard)
