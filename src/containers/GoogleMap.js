import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import InfoWindowFormat  from '../components/InfoWindowFormat'
import cough from '../cough.png'
import {styles} from '../services/mapStyles'

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
     
    onMarkerViewInfoWindowClick = (props, marker) =>
    {this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })}
     
    onMapClicked = () => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };

    handleMarkerViewInfoClick = (place) => {
      let markerId = place.id
      this.props.history.push(`/markers/${markerId}`)
    }
     
    render() {
      console.log(this.props.initialMapData)
      return (
        <div className="map">
        <Map 
            google={this.props.google}
            onClick={this.onMapClicked}
            zoom={2}
            minZoom={1.75}
            styles={styles}
            ref={(ref) => {this.map = ref}}
            initialCenter={{lat: 0, lng: 0}}
            bounds={this.state.bounds}>
                
                { this.props.initialMapData ? 
                (this.props.initialMapData.map(object =>
                    <Marker 
                    onClick={this.onMarkerViewInfoWindowClick}
                    position={{
                        lat: object.latitude,
                        lng: object.longitude}}
                    title={object.title}
                    address={object.address}
                    comments={object.comments}
                    id={object.id}
                    key={object.id}
                    message="this is a marker"
                    icon={cough}
                    />))
                    :
                    null
                }
     
            <InfoWindowFormat
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
                <div classname="info-window">
                  <h3>{this.state.selectedPlace.title}</h3>
                  <p>{this.state.selectedPlace.address}</p>
                  <p>{this.state.selectedPlace.message}</p>
                  <button className="button" onClick={() => this.handleMarkerViewInfoClick(this.state.selectedPlace)} key={this.state.selectedPlace.id}>More Info</button>
                  
                </div>
            </InfoWindowFormat>
          </Map>
          </div>
        )
    }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(GoogleMap);