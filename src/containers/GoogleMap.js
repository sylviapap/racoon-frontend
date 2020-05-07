import React, { Component, Fragment } from 'react';
import { Map, GoogleApiWrapper, Marker, Circle } from 'google-maps-react';
import InfoWindowRef  from '../components/InfoWindowRef'
import NavBar  from '../components/NavBar'
import logo from '../racoon-logo-small.png'
import {styles} from '../services/mapStyles'

// latitude = vertical! north, up and down

const containerStyle = {
  position: "fixed",
  width: "100%",
  height: "90%"
}

class GoogleMap extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }
     
  onMarkerClick = (props, marker) => {    
    console.log(props)
    if (this.props.history.location.pathname !== '/map') {
    this.props.history.push('/map')
  }
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
    if (this.props.history.location.pathname !== '/map') {
      this.props.history.push('/map')
    }
  }

  onMoreInfoClick = (place) => {
    let markerId = place.id
    this.onMapClick()
    this.props.history.push(`/map/markers/${markerId}`)
  }

  render() {
    const centerCoords = {lat: 20, lng: -40}

    return (
      <Fragment>
      <NavBar />
      <Map 
        className={"map"}
        containerStyle={containerStyle}
        google={this.props.google}
        onClick={this.onMapClick}
        zoom={2}
        minZoom={2}
        styles={styles}
        ref={(ref) => {this.map = ref}}
        initialCenter={centerCoords}
        center={centerCoords}
        >
          {this.props.officialMapData ?
          this.props.officialMapData.map(object => 
          <Circle
          key={this.props.officialMapData.indexOf(object)}
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
          lastUpdate={object.lastUpdate}
          />)
          :
          null
          }

        
              
        { this.props.myMapData ? 
        (this.props.myMapData.map(object =>
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
          creatorSymptoms={object.creator.symptoms}
          message="COVID-19 Self-Report"
          icon={logo}
          styles={{width: "20px"}}
          /> )
          )
          :
          null
        }

        <InfoWindowRef
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div className="info-window" key={this.state.selectedPlace.id}>
          {this.state.selectedPlace.name === "Marker" ? 
            (<div key={this.state.selectedPlace.id}><h3>{this.state.selectedPlace.message}</h3>
            <h3>{this.state.selectedPlace.title}</h3>
            <p>Address: {this.state.selectedPlace.address}</p>
            <p>Symptoms: </p><ul>{this.state.selectedPlace.creatorSymptoms.map(s => <li key={s.id}>{s.common_name}</li>)}</ul>
            <button 
              className="button" 
              onClick={() => this.onMoreInfoClick(this.state.selectedPlace)}
              key={this.state.selectedPlace.id}>More Info</button></div>)
              :
              (<div>
                <h3>{this.state.selectedPlace.country}</h3>
                <p>Confirmed cases: {this.state.selectedPlace.confirmed}</p>
                <p>Critical cases: {this.state.selectedPlace.critical}</p>
                <p>Deaths: {this.state.selectedPlace.deaths}</p>
                <p>Recovered: {this.state.selectedPlace.recovered}</p>
                <span className="info">Last Updated: {new Date(this.state.selectedPlace.lastUpdate).toString()}</span>
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