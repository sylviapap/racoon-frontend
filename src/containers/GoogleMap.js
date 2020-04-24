import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import InfoWindowFormat  from '../components/InfoWindowFormat'

const mapStyles = {
    width: '100%',
    height: '100%'
};

const containerStyle = {
  position: 'absolute',
  width: '95%',
  height: '95%'
};

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
      console.log(this.props.initialMapData)
      return (
        <Map 
            google={this.props.google}
            onClick={this.onMapClicked}
            containerStyle={containerStyle}
            zoom={2}
            ref={(ref) => {this.map = ref}}
            style={mapStyles}
            initialCenter={{lat: 0, lng: 0}}
            bounds={this.state.bounds}>
                
                { this.props.initialMapData ? 
                (this.props.initialMapData.map(object =>
                    <Marker 
                    onClick={this.onMarkerClick}
                    position={{
                        lat: object.latitude,
                        lng: object.longitude}}
                    title={object.title}
                    address={object.address}
                    comments={object.comments}
                    id={object.id}
                    key={object.id}
                    message="this is a marker"
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