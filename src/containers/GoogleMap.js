import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import InfoWindowFormat  from '../components/InfoWindowFormat'
import {BrowserRouter as Router, Link} from "react-router-dom"

const mapStyles = {
    width: '100%',
    height: '100%'
};

// const containerStyle = {
//   position: 'absolute'
// };

class GoogleMap extends Component {
    constructor() {
        super()
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            bounds: null
        }
    }

    // componentDidUpdate() {

    // }

    // componentWillReceiveProps(props) {
    //     props.data && this.autoZoom(props)
    // }

    // autoZoom = (props) => { 
    //     console.log("autozoom", props.data[0])
    //     let items = props.data && props.data[0].map(object => 
    //      ({lat: object["latitude"],
    //    lng: object["longitude"]}))
    //    let bounds = new this.props.google.maps.LatLngBounds();
    //    for (let i = 0; i < items.length; i++) {
    //      bounds.extend(items[i]);
    //    }
    //    this.setState({bounds: bounds})
    // }
     
    onMarkerClick = (props, marker, e) =>
    {console.log(props);
    this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });}
     
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };

    handleMarkerClick = (place) => {
      console.log(place)
      let markerId = place.id
      this.props.history.push(`/marker/${markerId}`)
    }
     
    render() {
      return (
        <Map 
            google={this.props.google}
            onClick={this.onMapClicked}
            // containerStyle={containerStyle}
            zoom={2}
            ref={(ref) => {this.map = ref}}
            style={mapStyles}
            initialCenter={{
                lat: 37.7749,
                lng: -122.4194 }}
            bounds={this.state.bounds}>
                
                { this.props.data ? 
                (this.props.data.map(object =>
                    <Marker 
                    onClick={this.onMarkerClick}
                    position={{
                        lat: object.latitude,
                        lng: object.longitude}}
                    title={object.title}
                    address={object.address}
                    id={object.id}
                    key={object.id}
                    message="hi"
                    />))
                    :
                    null
                }




     
            <InfoWindowFormat
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
                <div>
                  <h3>{this.state.selectedPlace.title}</h3>
                  <p>{this.state.selectedPlace.address}</p>
                  <p>{this.state.selectedPlace.message}</p>
                  <button className="button" onClick={() => this.handleMarkerClick(this.state.selectedPlace)} key={this.state.selectedPlace.id}>More Info</button>
                  
                </div>
            </InfoWindowFormat>
          </Map>
        )
    }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(GoogleMap);