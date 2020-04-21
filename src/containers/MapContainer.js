import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchInitialMap from '../actions/fetchInitialMap';
import GoogleMap from './GoogleMap'

class MapContainer extends Component {
  constructor() {
    super()
    this.state = {
      initialMap: [],
      centerLat: 37.7749,
      centerLong: -122.4194,
      zoom: 14
    }
  }

  componentWillReceiveProps(props) {
    this.setState({initialMap: props.initialMap})
  }
  
  // componentDidUpdate() {
  //   this.props.initialMap
  // }
  
  render() {
    return (
      <div className="map">
        <GoogleMap data={this.props.initialMap} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialMap: () => { dispatch(fetchInitialMap()) }
  }
}

const mapStateToProps = (state) => {
  return {
    initialMap: state.initialMap
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)