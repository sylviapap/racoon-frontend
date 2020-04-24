import React, { Component } from 'react';
import GoogleMap from './GoogleMap'

import { connect } from 'react-redux';

class MapContainer extends Component {
  
  render() {
    console.log(this.props)
    return (
      <div className="map">
        <GoogleMap history={this.props.history} initialMapData={this.props.initialMap} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(MapContainer)