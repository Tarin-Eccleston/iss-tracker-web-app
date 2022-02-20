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

  render() {
    return (
      <div className="map">
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCK2eAYFSo7KaKJCSQjzkhb2fJYSWlM_TA' }}
            defaultCenter={ this.state.center }
            defaultZoom={ this.state.zoom }
        >
          <LocationMarker lat={this.state.center.lat} lng={this.state.center.lng} />
        </GoogleMapReact>
      </div>
    )
  }
}

Map.defaultProps = {
    center: {
        lat: 42.3265,
        lng: -122.8756
    },
    alt: 0,
    zoom: 10
}

export default Map