import React, { Component, Fragment } from 'react';
import { Map, GoogleApiWrapper, Marker, Circle } from 'google-maps-react';
import InfoWindowRef  from '../components/InfoWindowRef'
import NavBar  from '../components/NavBar'
import cough from '../cough.png'
import {styles} from '../services/mapStyles'

// latitude = vertical! north, up and down

const containerStyle = {
  position: "fixed",
  width: "100%",
  height: "90%"
}

class GoogleMap extends Component {
  constructor() {
    super()
    this.state = {
      officialData: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      bounds: null
    }
  }

  componentDidMount() {
    this.fetchOfficialData()
  }

  fetchOfficialData = () => {
    fetch(`https://covid19-api.com/country/all`)
    .then(response => response.json())
    .then(json => this.setState({officialData: json}))
  }
     
  onMarkerClick = (props, marker) => {
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
    this.onMapClick()
    this.props.history.push(`/map/markers/${markerId}`)
    // this.props.handleMoreInfoClick(markerId)
  }

  render() {
    const centerCoords = {lat: 0, lng: -98.5794797}
    
    return (
      <Fragment>
      <NavBar />
      <Map 
        className={"map"}
        containerStyle={containerStyle}
        google={this.props.google}
        onClick={this.onMapClick}
        zoom={2}
        minZoom={1.75}
        styles={styles}
        ref={(ref) => {this.map = ref}}
        initialCenter={centerCoords}
        bounds={this.state.bounds}
        >
          {this.state.officialData ?
          this.state.officialData.map(object => 
          <Circle
          key={this.state.officialData.indexOf(object)}
          radius={Math.sqrt(object.confirmed) * 1000}
          center={{
            lat: parseFloat(object.latitude) || 0,
            lng: parseFloat(object.longitude) || 0}}
          strokeColor={"#FF0000"}
          strokeOpacity={0}
          strokeWeight={5}
          fillColor={"#FF0000"}
          fillOpacity={0.2}
          onClick={this.onMarkerClick}
          position={{
            lat: object.latitude,
            lng: object.longitude}}
          country={object.country}
          confirmed={object.confirmed}
          recovered={object.recovered}
          critical={object.critical}
          deaths={object.deaths}
          />)
          :
          null
          }

        
              
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
          {this.state.selectedPlace.name === "Marker" ? 
            (<div><h3>{this.state.selectedPlace.message}</h3>
            <h3>{this.state.selectedPlace.title}</h3>
            <p>Address: {this.state.selectedPlace.address}</p>
            <p>Symptoms: {this.state.selectedPlace.symptoms}</p>
            <button 
              className="button" 
              onClick={() => this.onMoreInfoClick(this.state.selectedPlace)}
              key={this.state.selectedPlace.id}>More Info</button></div>)
              :
              (<div>
                <h3>{this.state.selectedPlace.country}</h3>
                <p>Confirmed cases: {this.state.selectedPlace.confirmed}</p>
              </div>)}
          </div>
        </InfoWindowRef>
      </Map>
      </Fragment>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(GoogleMap);