import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, Circle } from 'google-maps-react';
import InfoWindowRef  from '../components/InfoWindowRef'
import cough from '../cough.png'
import {styles} from '../services/mapStyles'

// latitude = vertical! north, up and down

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
     
  onInfoWindowClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }
     
  onMapClick = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  onMoreInfoClick = (place) => {
    let markerId = place.id
    console.log(markerId)
    this.props.history.push(`/markers/${markerId}`)
  }

  render() {
    const coords = {lat: 0, lng: -98.5794797}
    const population = 2714856
    
    return (
    <div className="map">
      <Map 
        google={this.props.google}
        onClick={this.onMapClick}
        zoom={2}
        minZoom={1.75}
        styles={styles}
        ref={(ref) => {this.map = ref}}
        initialCenter={{lat: 0, lng: -98.5794797}}
        bounds={this.state.bounds}
        >

        <Circle
        radius={1200000}
        center={coords}
        strokeColor={"#FF0000"}
        strokeOpacity={0}
        strokeWeight={5}
        fillColor={"#FF0000"}
        fillOpacity={0.2}
        />
              
        { this.props.initialMapData ? 
        (this.props.initialMapData.map(object =>
        <Marker 
          onClick={this.onInfoWindowClick}
          position={{
            lat: object.latitude,
            lng: object.longitude}}
          title={object.title}
          address={object.address}
          comments={object.comments}
          id={object.id}
          key={object.id}
          symptoms={object.message}
          message="COVID-19 Self-Report"
          icon={cough}
          /> )
          )
          :
          null
        }
    
        <InfoWindowRef
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div className="info-window">
            <h3>{this.state.selectedPlace.message}</h3>
            <h3>{this.state.selectedPlace.title}</h3>
            <p>Address: {this.state.selectedPlace.address}</p>
            <p>Symptoms: {this.state.selectedPlace.symptoms}</p>
            <button 
              className="button" 
              onClick={() => this.onMoreInfoClick(this.state.selectedPlace)} 
              key={this.state.selectedPlace.id}>More Info</button>
          </div>
        </InfoWindowRef>
      </Map>
    </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(GoogleMap);