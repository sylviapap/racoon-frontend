import React, { Component } from 'react';
import GoogleMap from './GoogleMap'

import { connect } from 'react-redux';

class MapContainer extends Component {
  
  render() {
    return (
      <div className="map">
        <GoogleMap history={this.props.history} initialMapData={this.props.initialMap} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    initialMap: state.map.initialMap,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(MapContainer)