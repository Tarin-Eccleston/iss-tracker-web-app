import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'

const Map = ({ center, zoom }) => {
  return (
    <div className="map">
      <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCK2eAYFSo7KaKJCSQjzkhb2fJYSWlM_TA' }}
          defaultCenter={ center }
          defaultZoom={ zoom }
      >
        <LocationMarker lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  )
}

Map.defaultProps = {
    center: {
        lat: 42.3265,
        lng: -122.8756
    },
    zoom: 10
}

export default Map