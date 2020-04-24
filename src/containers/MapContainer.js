import React, { Component } from 'react';
import GoogleMap from './GoogleMap'

// import { connect } from 'react-redux';
// import { fetchInitialMap } from '../actions/fetchInitialMap';


class MapContainer extends Component {
  constructor() {
    super()
    this.state = {
      initialMap: []
    }
  }
  
  render() {
    console.log(this.props)
    return (
      <div className="map">
        <GoogleMap history={this.props.history} initialMapData={this.props.initialMap} />
      </div>
    )
  }
}

export default MapContainer