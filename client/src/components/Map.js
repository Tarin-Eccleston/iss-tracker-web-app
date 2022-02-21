import GoogleMapReact from 'google-map-react'
import GoogleApiWrapper from 'google-map-react'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import LocationMarker from './LocationMarker'
import React from 'react'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  state = {
    center: {
        lat: 0,
        lng: 0
    },
    alt: 0,
    zoom: 1
  }

  componentDidMount(){
      this.getCoordinates()
      this.interval = setInterval(this.getCoordinates, 16)
    
      // const current = this.state.center;
      // const google = this.props.google;
      // const maps = google.maps;
      // let center = new maps.LatLng(current.lat, current.lng);
      // this.myRef.current.panTo(center);
      console.log(this.myRef.google)

      // console.log(this.myRef)
  }

  componentWillUnmount(){
      clearInterval(this.interval)
  }

  getCoordinates = () => {
      fetch('/server')
          .then(res => res.json())
          .then(data => this.setState({
              center: {
                  lat: data.lat,
                  lng: data.lng
              },
              alt: data.alt
          }))
  }

  recenterMap() {
    const current = this.state.center;
    const google = this.props.google;
    const maps = google.maps;

    if (this.myRef.current) {
      let center = new maps.LatLng(current.lat, current.lng);
      this.myRef.current.panTo(center);
    }
  }

  render() {
    return (
      <div className="map">
        <GoogleMapReact
            ref={this.myRef}
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
            defaultCenter={ this.state.center }
            defaultZoom={ this.state.zoom }
        >
          <LocationMarker lat={this.state.center.lat} lng={this.state.center.lng} />
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map