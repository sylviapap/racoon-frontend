import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchInitialMap } from '../actions/fetchInitialMap';
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

  // componentDidMount() {
  //   this.props.fetchInitialMap()
  // }

  // componentWillReceiveProps(props) {
  //   this.setState({initialMap: props.initialMap})
  // }
  
  // componentDidUpdate() {
  //   this.props.initialMap && this.autoZoom()
  // }

  // autoZoom = () => { 
  //   console.log("zoom", this.props.initialMap[0])
  // }
  
  render() {
    console.log(this.props)
    return (
      <div className="map">
        <GoogleMap data={this.props.initialMap} />
      </div>
    )
  }
}

// const mapDispatchToProps = state => {
//   return {
//     initialMap: state.initialMap
//   }
// }

// export default connect(mapDispatchToProps, { fetchInitialMap })(MapContainer)

export default MapContainer