import React, { Component } from 'react'
import { connect } from 'react-redux'

class InfoCard extends Component{
    constructor(){
        super()
        this.state ={
            eventData: {}
        }
    }

    componentDidMount(){
        let id = this.props.match.params.id
        fetch(`http://localhost:3001/api/v1/map_events/${id}`)
        .then(response => response.json())
        .then(json => { console.log(json); this.setState({eventData: json})})
    }

    render(){
        return(
            <div className="info-page">
                <h1 className="info-page-title">{this.state.eventData.title}</h1>
                <p>{this.state.eventData.address}</p>
                <p>{this.state.eventData.comments ? 
                (this.state.eventData.comments.map(comment => comment.content))
                :
                null
            }</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoCard)
