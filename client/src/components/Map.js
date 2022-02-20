import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import React from 'react'

class Map extends React.Component {
  state = {
      center: {
          lat: 0,
          lng: 0
      },
      alt: 0,
      zoom: 10
  }

  componentDidMount(){
      this.getCoordinates()
      this.interval = setInterval(this.getCoordinates, 16)
      // this.map.panTo({
      //   lat: this.state.center.lat, lng: this.state.center.lng
      // })
      this.recenterMap()
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
    // const map = this.map;
    const current = this.state.center;

    // const google = this.props.google;
    // const maps = google.maps;

    if (this.map) {
      this.map.panTo(this.state.center);
    }
  }

  render() {
    return (
      <div className="map">
        <GoogleMapReact
            // bootstrapURLKeys={{ key: 'AIzaSyCK2eAYFSo7KaKJCSQjzkhb2fJYSWlM_TA' }}
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